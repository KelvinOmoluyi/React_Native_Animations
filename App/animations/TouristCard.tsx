import { Image, Pressable, StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { TouristCardType } from '../../types'
import { TOURIST_CARDS_DATA, TOURIST_CARDS_BG_COLORS } from '../../Data'
import Stack from '@/components/touristCarousel/Stack'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = 300;
const CARD_HEIGHT = 450;
const CARD_PADDING = 6;
const IMAGE_WIDTH = CARD_WIDTH - CARD_PADDING * 2;
const IMAGE_HEIGHT = 300;
const BORDER_RADIUS = 22;

const AnimatedCardContent = ({ item, isActive }: { item: TouristCardType; isActive: boolean }) => {
  const scale = useRef(new Animated.Value(isActive ? 1.15 : 1)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: isActive ? 1.15 : 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [isActive]);

  return (
    <View style={[styles.card, { backgroundColor: isActive ? '#0c0c0cff' : '#222222ff' }]}>
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
      <LinearGradient colors={[TOURIST_CARDS_BG_COLORS[itemId] || '#000000ff', 'rgba(34, 34, 34, 1)']} start={{x: 0, y: 0}} end={{x: 0, y: 0.7}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: "100%"}}>
          <Image source={TOURIST_CARDS_DATA[itemId].uri} style={{width: 40, height: 40, borderRadius: 20}}></Image>
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
        borderBottomWidth: 1,
        borderColor: '#666666ff',
        borderRadius: BORDER_RADIUS,
        justifyContent: 'space-between',
    },
})