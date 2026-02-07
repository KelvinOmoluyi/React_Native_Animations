import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from '../../types'
import { SWIPE_CARDS_DATA } from '../../Data'
import Deck from '../../components/swipeCard/Deck'

const renderItem = ({item}: {item: Card}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{item.text}</Text>
    </View>
  )
}

const SwipeCards = () => {
  return (
    <View style={{flex: 1}}>
      <Deck
        data={SWIPE_CARDS_DATA}
        renderCard={(item) => renderItem({item})}
       />
    </View>
  )
}

export default SwipeCards

const styles = StyleSheet.create({})