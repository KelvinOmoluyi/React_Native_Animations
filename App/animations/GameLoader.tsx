import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function GameLoader() {
  const progress = 0.7; // 70% progress
  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(200, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: "20deg" },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.barBackground}>
        {/* Progress Fill */}
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%` },
          ]}
        >
          {/* Shimmer Overlay */}
          <AnimatedGradient
            colors={[
              "rgba(255,255,255,0.0)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.0)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.shimmer, shimmerStyle]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  barBackground: {
    width: 300,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#2c2c2c",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff5f1f",
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    width: 200,
    height: "200%",
  },
});