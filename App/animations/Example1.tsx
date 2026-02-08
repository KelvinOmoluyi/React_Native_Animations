import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Animated } from 'react-native'

// Animated.Value
// Animated.createAnimatedComponent
// Animated.timing  // smooth animation
// Animated.spring  // bouncy animation
// Animated.decay   // 
// Animated.parallel
// Animated.sequence
// Animated.stagger
// Animated.loop
// Animated.delay
// Animated.event

const Example1 = () => {
  const ballAnimated = new Animated.Value(0);
  const postition  = new Animated.ValueXY({x: 130, y: 0});

  Animated.spring(postition, {
    toValue: {x: 130, y: 300},
    mass: 50,
    stiffness: 80,
    damping: 10,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{flex: 1}}>
      <Animated.View style={postition.getTranslateTransform()}>
        <View style={styles.ball} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    ball: {
      height: 80, 
      width: 80, 
      backgroundColor: "red", 
      borderRadius: 40
    }
})

export default Example1