import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Card } from '../../types'

type Props = {
    data: Card[];
    renderCard: (item: Card) => React.ReactNode;
    renderNoMoreCards: () => React.ReactNode;
    onSwipeRight: (item: Card) => void;
    onSwipeLeft: (item: Card) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250; // duration of the swipe animation

const Deck = ({data, renderCard, renderNoMoreCards, onSwipeRight, onSwipeLeft}: Props) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [index, setIndex] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true, // at the start of the event - called anytime they press on the screen
    onPanResponderMove: (e, gestureState) => { // when the event is going on
      position.setValue({x: gestureState.dx, y: 0})
    },
    onPanResponderRelease(e, gestureState) {
      if (gestureState.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gestureState.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    },
  });

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  }

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg'],
    })
    
    return {
      transform: [...position.getTranslateTransform(), { rotate }],
    }
  }

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(direction));
  }

  const onSwipeComplete = (direction: 'right' | 'left') => {
    const item = data[index];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    setIndex(prev => prev + 1);         // advance index first
    position.setValue({ x: 0, y: 0 }); // reset position after — prevents the swiped card
                                        // from snapping back to (0,0) while still rendered at old index
  }

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return data.map((item, i) => {
      if (i < index) { // if the index of the card is less than the current index, then it is already swiped
        return null;
      }

      if (i === index) { // if the index of the card is equal to the current index, then it is the top card
        return (
          <Animated.View key={item.id} style={[styles.cardStyle, getCardStyle()]} {...panResponder.panHandlers}>
            {renderCard(item)}
          </Animated.View>
        )
      }

      return (
        <Animated.View key={item.id} style={[styles.cardStyle]}>
          {renderCard(item)}
        </Animated.View>
      )
    }).reverse()
  }

  return (
    <View style={styles.deck}>
      {renderCards()}
    </View>
  )
}

export default Deck

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
  },
  cardStyle: {
    position: "absolute"
  }
})