import { Image, ImageBackground, PanResponder, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from '@/const/images'
import GlassComp from '../../components/GlassComp'
// @ts-ignore
import { FontAwesome } from '@expo/vector-icons'
import { useRef } from 'react'
import { Animated } from 'react-native'

const MovableCard = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy})
    },
    onPanResponderRelease: () => {
      Animated.spring(position, {
        toValue: {x: 0, y: 0},
        mass: 1,
        stiffness: 100,
        damping: 10,
        useNativeDriver: true,
      }).start();
    },
  })

  return (
    <>
    <StatusBar barStyle={"light-content"} />
      <ImageBackground 
        source={Images.LeafBackground1} 
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Animated.View style={position.getTranslateTransform()} {...panResponder.panHandlers}>
          <GlassComp
            style={styles.cardContainer}
            gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
          >
              <View style={styles.cardContent}>
                {/* Content goes here */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                  <GlassComp 
                    style={{height: 55, width: 55, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}
                    borderWidth={1}
                    intensity={25}
                    gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
                  >
                    <Image
                      source={Images.googleLogo}
                      style={{height: 30, width: 30, borderRadius: 15}}
                      height={30}
                      width={30}
                    />
                  </GlassComp>

                  <GlassComp 
                  style={styles.savedButton}
                    borderWidth={0.5}
                    intensity={25}
                    gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
                  >
                    <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>Saved</Text>
                    <FontAwesome name="bookmark" size={24} color="white" />
                  </GlassComp>
                </View>

                <View style={{marginTop: 30}}>
                  <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 24, fontWeight: "600", margin: 0, padding: 0}}>Google {" "}</Text>
                    <Text style={{color: "#b6b6b6ff", fontSize: 18, fontWeight: "600", margin: 0, padding: 0}}>20 Days</Text>
                  </View>

                  <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 12}}>
                    <Text style={{color: "white", fontSize: 40, fontWeight: "500", lineHeight: 40, margin: 0, padding: 0}}>Mobile Developer</Text>
                  </View>

                  <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 12, columnGap: 8}}>
                    <GlassComp 
                    style={styles.savedButton}
                      borderWidth={0.5}
                      intensity={25}
                      gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
                    >
                      <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>Full-Time</Text>
                    </GlassComp>
                    <GlassComp 
                    style={{...styles.savedButton, width: 130}}
                      borderWidth={0.5}
                      intensity={25}
                      gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
                    >
                      <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>Flexible Schedule</Text>
                    </GlassComp>
                  </View>
                </View>

                <View style={styles.bottomContent}>
                  <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", columnGap: 8}}>
                    <View>
                      <Text style={{color: "white", fontSize: 20, fontWeight: "400"}}>$150 - $220K</Text>
                      <Text style={{color: "#b6b6b6ff", fontSize: 16, fontWeight: "400", marginTop: 5}}>Mountain, View, CA</Text>
                    </View>

                    <View>
                      <GlassComp 
                        style={{...styles.savedButton, width: 110, height: 45}}
                          borderWidth={0.5}
                          intensity={10}
                          gradientColors={['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99']}
                        >
                          <Text style={{color: "white", fontSize: 16, fontWeight: "600"}}>Apply Now</Text>
                        </GlassComp>
                      </View>
                    </View>   
                </View>
              </View>
          </GlassComp>
        </Animated.View>
      </ImageBackground>
    </>
  )
}

export default MovableCard

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
  savedButton: {
    height: 35,
    width: 90,
    flexDirection: "row", 
    justifyContent: 'center', 
    alignItems: 'center', 
    columnGap: 8, 
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    borderRadius: 10
  },
  bottomContent: {
    height: 100,
    width: "100%",
    borderTopWidth: 1, 
    borderColor: "#96ae8cff",
    marginTop: 30,
    paddingVertical: 20,
  }
})