import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from '../../types'

type Props = {
    data: Card[];
    renderCard: (item: Card) => React.ReactNode;
}

const Deck = ({data, renderCard}: Props) => {
  return (
    <View style={styles.deck}>
      {data.map((item) => renderCard(item))}
    </View>
  )
}

export default Deck

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})