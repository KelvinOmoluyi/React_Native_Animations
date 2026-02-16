import { View, Text, ImageBackground, StatusBar } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'

const GlassyBottomSheet = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground 
        source={Images.cloudBackground} 
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
      </ImageBackground>
    </>
  )
}

export default GlassyBottomSheet