import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ── Card config ──────────────────────────────────────────
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const CARD_HEIGHT = CARD_WIDTH * 1.4;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15; // how far left before it snaps

const CARD_COLORS = [
  "#6C5CE7", // vivid purple
  "#00B894", // mint green
  "#FD79A8", // pink
  "#0984E3", // blue
  "#E17055", // burnt orange
  "#FDCB6E", // gold
] as const;

// Vertical & horizontal offsets so the stack peeks through
const STACK_OFFSET_Y = 8;
const STACK_OFFSET_X = 6;

// ── Spring config ────────────────────────────────────────
const SPRING_CONFIG = {
  damping: 18,
  stiffness: 200,
  mass: 0.8,
};

// ── Component ────────────────────────────────────────────
const StackableCards = () => {
  const [cardOrder, setCardOrder] = useState(
    CARD_COLORS.map((_, i) => i) // [0, 1, 2, 3, 4, 5]
  );

  // Shared values for the top card's gesture
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Called from the UI thread once the fling/snap finishes
  const cycleCards = () => {
    setCardOrder((prev) => {
      const next = [...prev];
      const top = next.shift()!;
      next.push(top); // move first → last
      return next;
    });
    // Reset position instantly (next card is already in place)
    translateX.value = 0;
    translateY.value = 0;
  };

  // ── Pan gesture ──────────────────────────────────────
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      "worklet";
      // Only allow dragging to the left (negative direction)
      translateX.value = Math.min(0, e.translationX);
      // Subtle vertical follow
      translateY.value = e.translationY * 0.15;
    })
    .onEnd((e) => {
      "worklet";
      if (e.translationX < -SWIPE_THRESHOLD) {
        // Snap off-screen to the left
        translateX.value = withTiming(
          -SCREEN_WIDTH * 1.2,
          { duration: 300, easing: Easing.out(Easing.cubic) },
          () => {
            runOnJS(cycleCards)();
          }
        );
        translateY.value = withTiming(0, { duration: 300 });
      } else {
        // Snap back to origin
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  return (
    <View style={styles.container}>
      <View style={styles.cardArea}>
        {/* Render cards in reverse so index-0 renders on top */}
        {[...cardOrder].reverse().map((colorIdx, renderIdx) => {
          // renderIdx 0 = bottom-most card drawn,  last = top card
          const stackPosition = cardOrder.length - 1 - renderIdx; // 0 = top
          const isTopCard = stackPosition === 0;

          return (
            <CardItem
              key={colorIdx}
              color={CARD_COLORS[colorIdx]}
              label={`${colorIdx + 1}`}
              stackPosition={stackPosition}
              isTopCard={isTopCard}
              translateX={translateX}
              translateY={translateY}
              pan={pan}
            />
          );
        })}
      </View>
    </View>
  );
};

// ── Individual card ──────────────────────────────────────
interface CardItemProps {
  color: string;
  label: string;
  stackPosition: number;
  isTopCard: boolean;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  pan: ReturnType<typeof Gesture.Pan>;
}

const CardItem = ({
  color,
  label,
  stackPosition,
  isTopCard,
  translateX,
  translateY,
  pan,
}: CardItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (isTopCard) {
      // Slight rotation tied to drag distance
      const rotate = interpolate(
        translateX.value,
        [-SCREEN_WIDTH, 0],
        [-18, 0]
      );

      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` },
        ],
        zIndex: 100,
      };
    }

    // Background cards: offset & scale down the deeper they are
    const scale = interpolate(
      stackPosition,
      [0, CARD_COLORS.length - 1],
      [1, 0.88]
    );

    return {
      transform: [
        { translateY: stackPosition * STACK_OFFSET_Y },
        { translateX: stackPosition * STACK_OFFSET_X },
        { scale },
      ],
      zIndex: 100 - stackPosition,
    };
  });

  const card = (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: color },
        animatedStyle,
      ]}
    >
      <Text style={styles.cardLabel}>{label}</Text>
    </Animated.View>
  );

  // Only the top card gets the gesture detector
  if (isTopCard) {
    return <GestureDetector gesture={pan}>{card}</GestureDetector>;
  }

  return card;
};

export default StackableCards;

// ── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
  },
  cardArea: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  cardLabel: {
    fontSize: 64,
    fontWeight: "800",
    color: "rgba(255,255,255,0.25)",
  },
});