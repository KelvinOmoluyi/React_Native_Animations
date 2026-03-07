import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import Svg, { Line, Text as SvgText } from "react-native-svg";
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

// Layout constants
const DIAL_SIZE = width - 20;       // Overall dial area including ticks
const KNOB_IMAGE_SIZE = width * 0.7; // The knob image size
const KNOB_RADIUS = KNOB_IMAGE_SIZE / 2;

// Tick mark geometry
const TICK_COUNT = 10;
const TICK_OUTER_RADIUS = DIAL_SIZE / 2 - 25;  // Where ticks start (outer edge)
const TICK_INNER_RADIUS = TICK_OUTER_RADIUS - 18; // Where ticks end (toward center)
const LABEL_RADIUS = TICK_OUTER_RADIUS + 14;  // Where number labels sit

// The max number displayed on the gauge
const MAX_DISPLAY_VALUE = 100;

// Generate tick mark data (angle + label)
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => {
  const angleDeg = (i / TICK_COUNT) * 360; // 0, 36, 72, ...
  const angleRad = ((angleDeg - 90) * Math.PI) / 180; // offset so 0 is at top
  const label = Math.round((i / TICK_COUNT) * MAX_DISPLAY_VALUE); // 0, 10, 20, ...
  return {
    angleDeg,
    // Outer point (away from center)
    x1: DIAL_SIZE / 2 + TICK_OUTER_RADIUS * Math.cos(angleRad),
    y1: DIAL_SIZE / 2 + TICK_OUTER_RADIUS * Math.sin(angleRad),
    // Inner point (toward center)
    x2: DIAL_SIZE / 2 + TICK_INNER_RADIUS * Math.cos(angleRad),
    y2: DIAL_SIZE / 2 + TICK_INNER_RADIUS * Math.sin(angleRad),
    // Label position
    lx: DIAL_SIZE / 2 + LABEL_RADIUS * Math.cos(angleRad),
    ly: DIAL_SIZE / 2 + LABEL_RADIUS * Math.sin(angleRad),
    label,
  };
});

export default function CircularControl() {
  const angle = useSharedValue(0);
  const displayAngle = useSharedValue(0);
  const prevAngle = useSharedValue(0);
  const isDragging = useSharedValue(false);
  // -1 = not locked, 0 = locked at 0°, 1 = locked at 360°
  const lockedAt = useSharedValue(-1);

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
        let raw = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (raw < 0) raw += 360;
        prevAngle.value = raw;
      } else {
        isDragging.value = false;
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

      // If locked at 360°, stay until finger returns to 270°–359°
      if (lockedAt.value === 1) {
        if (rawAngle >= 270 && rawAngle < 360) {
          lockedAt.value = -1;
          angle.value = rawAngle;
          displayAngle.value = Math.round(rawAngle);
          prevAngle.value = rawAngle;
        }
        return;
      }

      // If locked at 0°, stay until finger returns to 1°–90°
      if (lockedAt.value === 0) {
        if (rawAngle > 0 && rawAngle <= 90) {
          lockedAt.value = -1;
          angle.value = rawAngle;
          displayAngle.value = Math.round(rawAngle);
          prevAngle.value = rawAngle;
        }
        return;
      }

      // Detect boundary crossing
      const delta = rawAngle - prevAngle.value;

      if (delta > 180) {
        angle.value = 0;
        displayAngle.value = 0;
        lockedAt.value = 0;
        prevAngle.value = rawAngle;
        return;
      } else if (delta < -180) {
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
    });

  // Rotate the knob image
  const knobRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  // Scale 0–360 to 0–MAX_DISPLAY_VALUE for display
  const degreeText = useDerivedValue(() => {
    const scaled = Math.round((displayAngle.value / 360) * MAX_DISPLAY_VALUE);
    return `${scaled}`;
  });

  const animatedTextProps = useAnimatedProps(() => ({
    text: degreeText.value,
    defaultValue: degreeText.value,
  }));

  // Animated background
  const containerStyle = useAnimatedStyle(() => {
    const lightness = (displayAngle.value / 360) * MAX_DISPLAY_VALUE;
    return {
      backgroundColor: `hsl(0, 0%, ${lightness}%)`,
    };
  });

  // Derived color value — readable from other hooks and worklets
  const inverseBgColor = useDerivedValue(() =>
    displayAngle.value > 180 ? "black" : "white"
  );

  // For tick marks: animate opacity of dark vs light layers
  const darkTickOpacity = useAnimatedStyle(() => ({
    opacity: displayAngle.value > 180 ? 1 : 0,
  }));
  const lightTickOpacity = useAnimatedStyle(() => ({
    opacity: displayAngle.value > 180 ? 0 : 1,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: inverseBgColor.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.dialWrapper}>
          {/* Tick marks — light layer (visible on dark bg) */}
          <Animated.View style={[StyleSheet.absoluteFill, lightTickOpacity]}>
            <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
              {TICKS.map((tick, i) => (
                <React.Fragment key={i}>
                  <Line
                    x1={tick.x1} y1={tick.y1}
                    x2={tick.x2} y2={tick.y2}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <SvgText
                    x={tick.lx} y={tick.ly}
                    fill="rgba(255,255,255,0.7)"
                    fontSize={12} fontWeight="600"
                    textAnchor="middle" alignmentBaseline="central"
                  >
                    {tick.label}
                  </SvgText>
                </React.Fragment>
              ))}
            </Svg>
          </Animated.View>

          {/* Tick marks — dark layer (visible on light bg) */}
          <Animated.View style={[StyleSheet.absoluteFill, darkTickOpacity]}>
            <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
              {TICKS.map((tick, i) => (
                <React.Fragment key={i}>
                  <Line
                    x1={tick.x1} y1={tick.y1}
                    x2={tick.x2} y2={tick.y2}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <SvgText
                    x={tick.lx} y={tick.ly}
                    fill="rgba(0,0,0,0.7)"
                    fontSize={12} fontWeight="600"
                    textAnchor="middle" alignmentBaseline="central"
                  >
                    {tick.label}
                  </SvgText>
                </React.Fragment>
              ))}
            </Svg>
          </Animated.View>


          {/* Rotating knob image */}
          <Animated.View style={[styles.knobContainer, knobRotateStyle]}>
            <Image
              source={Images.circularKnob}
              style={styles.knobImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Center value display */}
          <View style={styles.centerLabel}>
            <AnimatedText
              animatedProps={animatedTextProps}
              textStyle={{color: "black"}}
            />
          </View>
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
    width: "100%",
    height: "100%",
  },
  centerLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    padding: 0,
  },
});