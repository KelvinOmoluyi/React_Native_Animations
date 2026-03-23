import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedProps,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Images } from "@/const/images";

const { width } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Layout constants
const DIAL_SIZE = width - 20;       // Overall dial area including ticks
const KNOB_IMAGE_SIZE = width * 0.7; // The knob image size
const KNOB_RADIUS = KNOB_IMAGE_SIZE / 2;

// Tick mark geometry
const TICK_COUNT = 25;
const TICK_RADIUS = DIAL_SIZE / 2 - 20;  // Where dots are placed
const ANGLE_START = 225;
const ANGLE_END = 135;
const ANGLE_RANGE = 270;

// The max number displayed on the gauge
const MAX_DISPLAY_VALUE = 100;

// Generate tick mark data (angle + progress mappings)
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => {
  const progress = i / (TICK_COUNT - 1); // 0.0 to 1.0
  const angleDeg = ANGLE_START + progress * ANGLE_RANGE;
  const angleRad = ((angleDeg - 90) * Math.PI) / 180; // offset so 0 is at top
  
  return {
    progress,
    cx: DIAL_SIZE / 2 + TICK_RADIUS * Math.cos(angleRad),
    cy: DIAL_SIZE / 2 + TICK_RADIUS * Math.sin(angleRad),
  };
});

function AnimatedDot({ tick, knobProgress }: { tick: { progress: number, cx: number, cy: number }; knobProgress: SharedValue<number> }) {
  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: knobProgress.value >= tick.progress ? 1 : 0,
    };
  });

  return (
    <AnimatedCircle
      cx={tick.cx}
      cy={tick.cy}
      r={3}
      fill="#ffea75ff"
      animatedProps={animatedProps}
    />
  );
}

export default function CircularControlTwo() {
  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .activeOffsetY([-10, 10])
    .onStart((e) => {
      "worklet";
      // Check if touch is within the knob circle
      const center = DIAL_SIZE / 2;
      const dx = e.x - center;
      const dy = e.y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= KNOB_RADIUS) {
        isDragging.value = true;
      }
    })
    .onUpdate((e) => {
      "worklet";
      if (!isDragging.value) return;

      const center = DIAL_SIZE / 2;
      const x = e.x - center;
      const y = e.y - center;
      let rawAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (rawAngle < 0) rawAngle += 360;

      let mappedAngle = rawAngle - ANGLE_START;
      if (mappedAngle < 0) mappedAngle += 360;

      // Handle the "dead zone" (the gap between 135 and 225 deg at the bottom)
      if (mappedAngle > ANGLE_RANGE) {
        // If it crosses the midway point of the dead gap, clamp to either 0 or MAX
        if (mappedAngle > (ANGLE_RANGE + (360 - ANGLE_RANGE) / 2)) {
          mappedAngle = 0;
        } else {
          mappedAngle = ANGLE_RANGE;
        }
      }

      progress.value = mappedAngle / ANGLE_RANGE;
    })
    .onEnd(() => {
      "worklet";
      isDragging.value = false;
    });

  // Calculate the derived actual angle based on 0-1 progress
  const angle = useDerivedValue(() => {
    return ANGLE_START + progress.value * ANGLE_RANGE;
  });

  // Rotate the knob image
  const knobRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  // Scale 0-1 progress to 0-MAX_DISPLAY_VALUE for display
  const degreeText = useDerivedValue(() => {
    const scaled = Math.round(progress.value * MAX_DISPLAY_VALUE);
    return `${scaled}`;
  });

  const animatedTextProps = useAnimatedProps(() => ({
    text: degreeText.value,
    defaultValue: degreeText.value,
  }));

  return (
    <Animated.View style={[styles.container]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.dialWrapper}>
          
          <Animated.View style={[StyleSheet.absoluteFill]}>
            <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
              {/* Dark / Inactive ticks layer */}
              {TICKS.map((tick, i) => (
                <Circle
                  key={`inactive-${i}`}
                  cx={tick.cx}
                  cy={tick.cy}
                  r={3}
                  fill="rgba(0, 0, 0, 1)"
                />
              ))}

              {/* Active / Yellow ticks layer */}
              {TICKS.map((tick, i) => (
                <AnimatedDot 
                  key={`active-${i}`} 
                  tick={tick} 
                  knobProgress={progress} 
                />
              ))}
            </Svg>
          </Animated.View>

          {/* Static dark gradient knob image (it doesn't rotate) */}
          <View style={styles.outerCenterLabel}>
            <Image
              source={Images.darkKnob}
              style={styles.outerCenterKnobImage}
              resizeMode="contain"
            />
          </View>
        
          {/* Rotating pointer knob image */}
          <Animated.View style={[styles.knobContainer, knobRotateStyle]}>
            <Image
              source={Images.darkKnobPointer}
              style={styles.knobImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Center value display */}
          {/* <View style={[styles.centerLabel]}>
            <AnimatedText
              animatedProps={animatedTextProps}
              textStyle={{color: "white"}}
            />
          </View> */}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

// Animated text helper
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText({
  animatedProps,
  textStyle,
}: {
  animatedProps: any;
  textStyle: any;
}) {
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={[styles.valueText, textStyle]}
      animatedProps={animatedProps as any}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  dialWrapper: {
    width: DIAL_SIZE,
    height: DIAL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  knobContainer: {
    width: KNOB_IMAGE_SIZE,
    height: KNOB_IMAGE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  knobImage: {
    width: "140%",
    height: "140%",
  },
  outerCenterKnobImage: {
    width: "100%",
    height: "100%",
  },
  centerLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  outerCenterLabel: {
    position: "absolute",
    width: KNOB_IMAGE_SIZE,
    height: KNOB_IMAGE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: KNOB_IMAGE_SIZE / 2, // Fixed for React Native compatibility
  },
  valueText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    padding: 0,
  },
});