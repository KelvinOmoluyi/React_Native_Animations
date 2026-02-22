import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width * 0.8;
const RADIUS = SIZE / 2;
const STROKE = 30;
const INNER_RADIUS = RADIUS - STROKE / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularControl() {
  const angle = useSharedValue(0);

  const polarToCartesian = (cx: number, cy: number, r: number, a: number) => {
    const rad = (a - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const gesture = Gesture.Pan().onUpdate((e) => {
    const x = e.x - RADIUS;
    const y = e.y - RADIUS;

    let newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (newAngle < 0) newAngle += 360;

    angle.value = newAngle;

    runOnJS(console.log)(Math.round(newAngle));
  });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      2 * Math.PI * INNER_RADIUS *
      (1 - angle.value / 360),
  }));

  const circumference = 2 * Math.PI * INNER_RADIUS;

  const knobPosition = () =>
    polarToCartesian(RADIUS, RADIUS, INNER_RADIUS, angle.value);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Svg width={SIZE} height={SIZE}>
          {/* Background Circle */}
          <Circle
            cx={RADIUS}
            cy={RADIUS}
            r={INNER_RADIUS}
            stroke="#ddd"
            strokeWidth={STROKE}
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
            rotation="-90"
            originX={RADIUS}
            originY={RADIUS}
          />

          {/* Knob */}
          <Circle
            cx={knobPosition().x}
            cy={knobPosition().y}
            r={15}
            fill="#ff9500"
          />
        </Svg>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});