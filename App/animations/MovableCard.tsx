import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'
import { BlurView } from 'expo-blur'

const MovableCard = () => {
  return (
    <ImageBackground 
      source={Images.LeafBackground1} 
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <View style={styles.card}>
        <BlurView 
          experimentalBlurMethod="dimezisBlurView" 
          intensity={15} 
          style={styles.blurView} 
        />

        <View style={styles.cardContent}>

        </View>
      </View>
    </ImageBackground>
  )
}

export default MovableCard

const styles = StyleSheet.create({
  card: {
    height: 450,
    width: 300,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 20,
    borderWidth: 1.5,
    borderTopColor: "#898d99",
    borderBottomColor: "#898d99",
    borderLeftColor: "#43423d",
    borderRightColor: "#43423d",
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  }
})