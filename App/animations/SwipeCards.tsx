import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from '../../types'
import { SWIPE_CARDS_DATA } from '../../Data'
import Deck from '../../components/swipeCard/Deck'

const CARD_WIDTH = 300;
const CARD_HEIGHT = 400;
const CARD_PADDING = 10;
const IMAGE_WIDTH = CARD_WIDTH - CARD_PADDING * 2;
const IMAGE_HEIGHT = 250;
const BORDER_RADIUS = 10;

const renderItem = ({item}: {item: Card}) => {
  return (
    <View key={item.id} style={styles.card}>
      <Image source={{uri: item.uri}} style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}} />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{item.id}</Text>
        <Text style={{fontSize: 20, fontWeight: 'normal'}}>{item.text}</Text>
      </View>

      <View style={{alignItems: "center", paddingHorizontal: 10}}>
          <Pressable style={{width: "100%", height: 40, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>see more...</Text>
        </Pressable>
      </View>
    </View>
  )
}

const SwipeCards = () => {
  return (
    <View style={{flex: 1}}>
      <Deck
        data={SWIPE_CARDS_DATA}
        renderCard={(item) => renderItem({item})}
        onSwipeLeft={() => {}}
        onSwipeRight={() => {}}
      />
    </View>
  )
}

export default SwipeCards

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        backgroundColor: '#ecececff',
        padding: 10,
        borderRightWidth: 2,
        borderBottomWidth: 4,
        borderColor: '#666666ff',
        borderRadius: BORDER_RADIUS,
    }
})