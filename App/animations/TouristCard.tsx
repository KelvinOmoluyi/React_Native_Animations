import { Image, Pressable, StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { TouristCardType } from '../../types'
import { TOURIST_CARDS_DATA, TOURIST_CARDS_BG_COLORS } from '../../Data'
import Stack from '@/components/touristCarousel/Stack'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Entypo, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import IMAGES from '@/Data/image'
import { BlurView } from 'expo-blur'

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = 300;
const CARD_HEIGHT = 460;
const CARD_PADDING = 6;
const IMAGE_WIDTH = CARD_WIDTH - CARD_PADDING * 2;
const IMAGE_HEIGHT = 300;
const BORDER_RADIUS = 22;

export const TOURIST_CARDS_LOGOS = [
  <Octicons name="home-fill" size={20} color="#ebebebff" />,
  <FontAwesome6 name="mountain" size={20} color="#ebebebff" />,
  <FontAwesome5 name="paper-plane" size={20} color="#ebebebff" />,
];

const CARD_LOGO = [
  <MaterialIcons name="kitesurfing" size={16} color="#ebebebff" />,
  <Entypo name="flower" size={16} color="#ebebebff" />,
  <MaterialCommunityIcons name="cactus" size={16} color="#ebebebff" />,
  <FontAwesome5 name="mountain" size={16} color="#ebebebff" />,
]

const getCardLogo = (id: number) => {
  return CARD_LOGO[id - 1];
}

const AnimatedCardContent = ({ item, isActive }: { item: TouristCardType; isActive: boolean }) => {
  const scale = useRef(new Animated.Value(isActive ? 1.15 : 1)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: isActive ? 1.2 : 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [isActive]);

  return (
    <View style={[styles.card, { backgroundColor: isActive ? '#0c0c0cff' : '#222222ff' }]}>
      <View style={{width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          {getCardLogo(item.id)}
        </View>
        <View style={{padding: 6, borderRadius: 22, backgroundColor: item.linkColor}}>
          <AntDesign name="link" size={24} color="black" />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16 }}>
        <Text style={{ fontSize: 40, fontWeight: 'normal', textAlign: 'center', color: 'white' }}>{item.text}</Text>
      </View>

      <View
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <Animated.Image
          source={item.uri}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            borderRadius: 16,
            transform: [{ scale }],
          }}
        />
      </View>
    </View>
  );
};

const renderItem = ({ item, isActive }: { item: TouristCardType; isActive: boolean }) => {
  return <AnimatedCardContent item={item} isActive={isActive} />;
};

const renderNoMoreCards = () => {
  return (
    <View style={styles.card}>
      <View style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT, backgroundColor: '#d1f1ffff'}}>

      </View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>All done</Text>
        <Text style={{fontSize: 20, fontWeight: 'normal'}}>You've seen all the cards!</Text>
      </View>

      <View style={{alignItems: "center", paddingHorizontal: 10}}>
          <Pressable style={{width: "100%", height: 40, backgroundColor: '#03a9f4', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>Get more...</Text>
        </Pressable>
      </View>
    </View>
  )
}

const TouristCard = () => {
  const [itemId, setItemId] = useState(0);


  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={[TOURIST_CARDS_BG_COLORS[itemId] || '#000000ff', 'rgba(34, 34, 34, 1)']} start={{x: 0, y: 0}} end={{x: 0, y: 0.7}} style={{flex: 1, paddingHorizontal: 10}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: "100%", paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image source={IMAGES.alexanderTheGreat} style={{width: 40, height: 40, borderRadius: 20}}></Image>

            <View style={{backgroundColor: "#22222244", padding: 10, borderRadius: 20}}>
              <Ionicons name='notifications' color={"white"} size={20} />
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Stack
              data={TOURIST_CARDS_DATA}
              renderCard={(item, isActive) => renderItem({ item, isActive })}
              renderNoMoreCards={renderNoMoreCards}
              onSwipeDown={() => {}}
              onSwipeUp={() => {}}
              setItemId={setItemId}
            />
          </View>

          <View style={{position: "absolute", bottom: 30, width: "100%", alignItems: 'center'}}>
            <View style={{position: "relative", width: "60%", height: 60, borderRadius: 30, zIndex: 10, overflow: "hidden"}}>
              <BlurView experimentalBlurMethod='dimezisBlurView' tint="light" style={{flex: 1, padding: 4, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} intensity={10}>
                {TOURIST_CARDS_LOGOS.map((logo, i) => (
                  <View key={i} style={{height: 51, width: 51, backgroundColor: "#4e4e4e44", borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
                    {logo}
                  </View>
                ))}
              </BlurView>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}

export default TouristCard

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        padding: CARD_PADDING,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: '#666666ff',
        borderRadius: BORDER_RADIUS,
        justifyContent: 'space-between',
    },
})