import React from "react";
import { View, StyleSheet, Dimensions, Text, TextInput } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useDerivedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width * 0.8;
const RADIUS = SIZE / 2;
const STROKE = 30;
const INNER_RADIUS = RADIUS - STROKE / 2;
const KNOB_SIZE = 30;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularControl() {
  const angle = useSharedValue(0);
  const displayAngle = useSharedValue(0);

  // Convert angle to cartesian for the knob
  const knobX = useDerivedValue(() => {
    const rad = (angle.value - 90) * (Math.PI / 180);
    return RADIUS + INNER_RADIUS * Math.cos(rad);
  });

  const knobY = useDerivedValue(() => {
    const rad = (angle.value - 90) * (Math.PI / 180);
    return RADIUS + INNER_RADIUS * Math.sin(rad);
  });

  const circumference = 2 * Math.PI * INNER_RADIUS;

  const gesture = Gesture.Pan()
    // Prevent conflict with Android system back gesture / navigation swipe
    .activeOffsetX([-10, 10])
    .activeOffsetY([-10, 10])
    .onStart((e) => {
      // Calculate the angle on start too so the knob jumps to where you tap
      "worklet";
      const x = e.x - RADIUS;
      const y = e.y - RADIUS;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (newAngle < 0) newAngle += 360;
      angle.value = newAngle;
      displayAngle.value = Math.round(newAngle);
    })
    .onUpdate((e) => {
      "worklet";
      const x = e.x - RADIUS;
      const y = e.y - RADIUS;
      let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (newAngle < 0) newAngle += 360;
      angle.value = newAngle;
      displayAngle.value = Math.round(newAngle);
    })
    .hitSlop({ top: 20, bottom: 20, left: 20, right: 20 });

  // Animated props for the progress arc
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference * (1 - angle.value / 360),
  }));

  // Animated style for the knob (using absolute positioning over the SVG)
  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: knobX.value - KNOB_SIZE / 2 },
      { translateY: knobY.value - KNOB_SIZE / 2 },
    ],
  }));

  // Animated style for the degree text
  const degreeText = useDerivedValue(() => `${displayAngle.value}°`);

  const animatedTextProps = useAnimatedProps(() => ({
    text: degreeText.value,
    defaultValue: degreeText.value,
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.controlWrapper}>
          <Svg width={SIZE} height={SIZE}>
            {/* Background Circle */}
            <Circle
              cx={RADIUS}
              cy={RADIUS}
              r={INNER_RADIUS}
              stroke="#3a3a3a"
              strokeWidth={STROKE}
              fill="none"
            />

            {/* Progress Arc */}
            <AnimatedCircle
              cx={RADIUS}
              cy={RADIUS}
              r={INNER_RADIUS}
              stroke="#ff9500"
              strokeWidth={STROKE}
              strokeDasharray={circumference}
              animatedProps={animatedProps}
              strokeLinecap="round"
              fill="none"
              rotation={-90}
              originX={RADIUS}
              originY={RADIUS}
            />
          </Svg>

          {/* Animated Knob — positioned absolutely over the SVG */}
          <Animated.View style={[styles.knob, knobStyle]} />

          {/* Center degree display */}
          <View style={styles.centerLabel}>
            <AnimatedText animatedProps={animatedTextProps} />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

// Small helper component for animated text
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText({
  animatedProps,
}: {
  animatedProps: ReturnType<typeof useAnimatedProps>;
}) {
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={styles.degreeText}
      animatedProps={animatedProps as any}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  controlWrapper: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  knob: {
    position: "absolute",
    top: 0,
    left: 0,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: "#fff",
    // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  centerLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  degreeText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    padding: 0,
  },
});