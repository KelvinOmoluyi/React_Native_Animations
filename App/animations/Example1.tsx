import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Animated } from 'react-native'

// Animated.Value
// Animated.createAnimatedComponent
// Animated.timing
// Animated.spring
// Animated.decay
// Animated.parallel
// Animated.sequence
// Animated.stagger
// Animated.loop
// Animated.delay
// Animated.event

const Example1 = () => {
  const ballAnimated = new Animated.Value(0);
  const postition  = new Animated.ValueXY({x: 0, y: 0});

  Animated.spring(postition, {
    toValue: {x: 100, y: 500},
    useNativeDriver: true,
  }).start();

  return (
    <View style={{flex: 1}}>
      <Animated.View style={postition.getLayout()}>
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