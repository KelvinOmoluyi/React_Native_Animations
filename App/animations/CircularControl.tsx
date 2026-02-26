import React from "react";
import { View, StyleSheet, Dimensions, Text, TextInput, ImageBackground } from "react-native";
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
} from "react-native-reanimated";
import { Images } from "@/const/images";

const { width } = Dimensions.get("window");
const SIZE = width * 0.8;
const RADIUS = SIZE / 2;
const STROKE = 30;
const INNER_RADIUS = RADIUS - STROKE / 2;
const KNOB_SIZE = 30;
// How close (in px) the touch must be to the knob to start dragging
const KNOB_HIT_RADIUS = 40;
// The max number displayed on the gauge (e.g. 100 for 0–100%, 360 for degrees)
const MAX_DISPLAY_VALUE = 100;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularControl() {
  const angle = useSharedValue(0);
  const displayAngle = useSharedValue(0);
  const prevAngle = useSharedValue(0);
  const isDragging = useSharedValue(false);
  // -1 = not locked, 0 = locked at 0°, 1 = locked at 360°
  const lockedAt = useSharedValue(-1);

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
    .activeOffsetX([-10, 10])
    .activeOffsetY([-10, 10])
    .onStart((e) => {
      "worklet";
      const dx = e.x - knobX.value;
      const dy = e.y - knobY.value;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= KNOB_HIT_RADIUS) {
        isDragging.value = true;
        const tx = e.x - RADIUS;
        const ty = e.y - RADIUS;
        let raw = Math.atan2(ty, tx) * (180 / Math.PI) + 90;
        if (raw < 0) raw += 360;
        prevAngle.value = raw;
      } else {
        isDragging.value = false;
      }
    })
    .onUpdate((e) => {
      "worklet";
      if (!isDragging.value) return;

      const x = e.x - RADIUS;
      const y = e.y - RADIUS;
      let rawAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (rawAngle < 0) rawAngle += 360;

      // If locked at 360°, stay there until finger comes back to upper-right quadrant (270°–359°)
      if (lockedAt.value === 1) {
        if (rawAngle >= 270 && rawAngle < 360) {
          // User reversed back — unlock and use this angle
          lockedAt.value = -1;
          angle.value = rawAngle;
          displayAngle.value = Math.round(rawAngle);
          prevAngle.value = rawAngle;
        }
        // Otherwise stay locked at 360
        return;
      }

      // If locked at 0°, stay there until finger comes back to upper-left quadrant (1°–90°)
      if (lockedAt.value === 0) {
        if (rawAngle > 0 && rawAngle <= 90) {
          // User reversed forward — unlock and use this angle
          lockedAt.value = -1;
          angle.value = rawAngle;
          displayAngle.value = Math.round(rawAngle);
          prevAngle.value = rawAngle;
        }
        // Otherwise stay locked at 0
        return;
      }

      // Detect boundary crossing
      const delta = rawAngle - prevAngle.value;

      if (delta > 180) {
        // Crossed top going counter-clockwise → lock at 0°
        angle.value = 0;
        displayAngle.value = 0;
        lockedAt.value = 0;
        prevAngle.value = rawAngle;
        return;
      } else if (delta < -180) {
        // Crossed top going clockwise → lock at 360°
        angle.value = 360;
        displayAngle.value = 360;
        lockedAt.value = 1;
        prevAngle.value = rawAngle;
        return;
      }

      // Normal update
      const clamped = Math.min(360, Math.max(0, rawAngle));
      angle.value = clamped;
      displayAngle.value = Math.round(clamped);
      prevAngle.value = rawAngle;
    })
    .onEnd(() => {
      "worklet";
      isDragging.value = false;
      lockedAt.value = -1;
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

  // Scale 0–360 internal angle to 0–MAX_DISPLAY_VALUE for display
  const degreeText = useDerivedValue(() => {
    const scaled = Math.round((displayAngle.value / 360) * MAX_DISPLAY_VALUE);
    return `${scaled}`;
  });

  const animatedTextProps = useAnimatedProps(() => ({
    text: degreeText.value,
    defaultValue: degreeText.value,
  }));

  // Animated background — lightness changes with the gauge value
  const containerStyle = useAnimatedStyle(() => {
    const lightness = (displayAngle.value / 360) * MAX_DISPLAY_VALUE;
    return {
      backgroundColor: `hsl(0, 0%, ${lightness}%)`,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: displayAngle.value > 180 ? "black" : "white",
    };
  });

  return (
      <Animated.View style={[styles.container, containerStyle]}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={styles.controlWrapper}>
            <Svg width={SIZE} height={SIZE}>
              {/* Background Circle */}
              <Circle
                cx={RADIUS}
                cy={RADIUS}
                r={INNER_RADIUS}
                stroke="#3a3a3a48"
                strokeWidth={STROKE}
                fill="none"
              />

              {/* Progress Arc */}
              <AnimatedCircle
                cx={RADIUS}
                cy={RADIUS}
                r={INNER_RADIUS}
                stroke="#04e4e4ff"
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
              <AnimatedText animatedProps={animatedTextProps} textStyle={textStyle} />
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View> 
  );
}

// Small helper component for animated text
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText({
  animatedProps,
  textStyle,
}: {
  animatedProps: ReturnType<typeof useAnimatedProps>;
  textStyle: any;
}) {
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={[styles.degreeText, textStyle]}
      animatedProps={animatedProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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