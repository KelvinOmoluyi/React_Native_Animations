import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'
import GlassComp from '@/components/GlassComp'

const MotivationCard = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground 
        source={Images.bubbleBackground} 
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <GlassComp
          style={styles.cardContainer}
          intensity={20}
          borderWidth={1}
          gradientColors={['#dadadaff', '#dadadaff']}
        >
          <View></View>
        </GlassComp>
      </ImageBackground>
    </>
  )
}

export default MotivationCard

const styles = StyleSheet.create({
  cardContainer: {
    height: 450,
    width: 300,
    borderRadius: 30,
  },
  cardContent: {
    height: 447,
    width: 297,
    padding: 12,
    justifyContent: "space-between",
  },
})