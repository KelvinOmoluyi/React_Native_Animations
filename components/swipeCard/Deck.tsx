import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
const SWIPE_OUT_DURATION = 250;
const MAX_VISIBLE_CARDS = 8;
const CARD_OFFSET = 10; // vertical offset between stacked cards

const Deck = ({data, renderCard, renderNoMoreCards, onSwipeRight, onSwipeLeft}: Props) => {
  // ── Fresh Animated.ValueXY per card so the next card never inherits off-screen position ──
  const positionRef = useRef(new Animated.ValueXY());
  const [index, setIndex] = useState(0);

  // One Animated.Value per data item to drive smooth top-offset transitions
  const topAnimsRef = useRef<Animated.Value[]>(
    data.map((_, i) => new Animated.Value(i * CARD_OFFSET))
  );

  // Stable refs so animation callbacks always read the latest values
  const indexRef = useRef(index);
  indexRef.current = index;

  const dataRef = useRef(data);
  dataRef.current = data;

  const onSwipeRightRef = useRef(onSwipeRight);
  onSwipeRightRef.current = onSwipeRight;

  const onSwipeLeftRef = useRef(onSwipeLeft);
  onSwipeLeftRef.current = onSwipeLeft;

  const isSwipingRef = useRef(false);

  useEffect(() => {
    if (data.length > 0){
      setIndex(0);
    }
  }, [data])

  // ── When index changes, animate each visible card's top offset to its new position ──
  useEffect(() => {
    const anims = topAnimsRef.current;
    const lastVisible = Math.min(index + MAX_VISIBLE_CARDS, data.length);

    const springs: Animated.CompositeAnimation[] = [];
    for (let i = index; i < lastVisible; i++) {
      const stackPos = i - index; // 0 for active, 1 for first behind, etc.
      springs.push(
        Animated.spring(anims[i], {
          toValue: stackPos * CARD_OFFSET,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        })
      );
    }
    if (springs.length > 0) {
      Animated.parallel(springs).start();
    }
  }, [index, data.length]);

  // ── PanResponder (created once, reads positionRef.current each time) ──
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isSwipingRef.current,
      onMoveShouldSetPanResponder: () => !isSwipingRef.current,
      onPanResponderMove: (_, gesture) => {
        positionRef.current.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease(_, gesture) {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          Animated.spring(positionRef.current, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;

    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;

    Animated.timing(positionRef.current, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      const currentIndex = indexRef.current;
      const item = dataRef.current[currentIndex];
      direction === 'right'
        ? onSwipeRightRef.current(item)
        : onSwipeLeftRef.current(item);

      // Create a FRESH animated value — the new card starts at (0,0)
      positionRef.current = new Animated.ValueXY();

      setIndex(currentIndex + 1);
      isSwipingRef.current = false;
    });
  };

  const getCardStyle = (rotateZ: Animated.AnimatedInterpolation<string | number>) => {
    const pos = positionRef.current;
    const rotate = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    return {
      transform: [
        { rotateZ },
        ...pos.getTranslateTransform(),
        { rotate },
      ],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    const cards: React.ReactNode[] = [];
    const lastVisible = Math.min(index + MAX_VISIBLE_CARDS, data.length);
    const topAnims = topAnimsRef.current;

    // Render bottom-to-top so the last child (active card) is visually
    // on top even without zIndex support.
    for (let i = lastVisible - 1; i >= index; i--) {
      const item = data[i];
      const isActive = i === index;

      // rotateZ expects a string like "10deg". We must interpolate the numeric topAnims value.
      const rotateZ = topAnims[i].interpolate({
        inputRange: [-560, 0, 560],
        outputRange: ['-360deg', '0deg', '360deg'],
      });

      cards.push(
        <Animated.View
          key={item.id}
          style={[
            styles.cardStyle,
            { zIndex: data.length - i },
            isActive
              ? getCardStyle(rotateZ)
              : { transform: [{ rotateZ }] },
          ]}
          {...(isActive ? panResponder.panHandlers : undefined)}
        >
          {renderCard(item)}
        </Animated.View>
      );
    }

    return cards;
  };

  return (
    <View style={styles.deck}>
      {renderCards()}
    </View>
  );
};

export default Deck

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
  },
  cardStyle: {
    position: "absolute",
  },
})