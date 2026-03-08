import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouristCardType } from '../../types'

type Props = {
    data: TouristCardType[];
    renderCard: (item: TouristCardType, isActive: boolean) => React.ReactNode;
    renderNoMoreCards: () => React.ReactNode;
    onSwipeDown: (item: TouristCardType) => void;
    onSwipeUp: (item: TouristCardType) => void;
    setItemId: (id: number) => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.17 * SCREEN_HEIGHT;
const SWIPE_OUT_DURATION = 150;
const MAX_VISIBLE_CARDS = 3;
const CARD_OFFSET = 10; // vertical offset between stacked cards

const Stack = ({data, renderCard, renderNoMoreCards, onSwipeDown, onSwipeUp, setItemId}: Props) => {
  // ── swipeYRef handles vertical movement. Fresh instance per card to avoid flash. ──
  const swipeYRef = useRef(new Animated.Value(0));
  const swipeXRef = useRef(new Animated.Value(0));
  const [index, setIndex] = useState(0);

  // topAnimsRef handles behind-card stacking transitions
  const topAnimsRef = useRef<Animated.Value[]>(
    data.map((_, i) => new Animated.Value(i * CARD_OFFSET))
  );

  const indexRef = useRef(index);
  indexRef.current = index;
  const dataRef = useRef(data);
  dataRef.current = data;
  const onSwipeDownRef = useRef(onSwipeDown);
  onSwipeDownRef.current = onSwipeDown;
  const onSwipeUpRef = useRef(onSwipeUp);
  onSwipeUpRef.current = onSwipeUp;
  const isSwipingRef = useRef(false);



  useEffect(() => {
    setItemId(index);
  }, [index, setItemId]);

  useEffect(() => {
    const anims = topAnimsRef.current;
    const lastVisible = Math.min(index + MAX_VISIBLE_CARDS, data.length);
    const springs: Animated.CompositeAnimation[] = [];
    for (let i = index; i < lastVisible; i++) {
      springs.push(
        Animated.spring(anims[i], {
          toValue: (i - index) * CARD_OFFSET,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        })
      );
    }
    if (springs.length > 0) Animated.parallel(springs).start();
  }, [index, data.length]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return !isSwipingRef.current && Math.abs(gesture.dy) > Math.abs(gesture.dx) && Math.abs(gesture.dy) > 1;
      },
      onPanResponderMove: (_, gesture) => {
        swipeYRef.current.setValue(gesture.dy);
      },
      onPanResponderRelease(_, gesture) {
        if (gesture.dy > SWIPE_THRESHOLD) {
          forceSwipeDown();
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          forceSwipeUp();
        } else {
          Animated.spring(swipeYRef.current, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const forceSwipeDown = () => {
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;

    Animated.timing(swipeYRef.current, {
      toValue: SCREEN_HEIGHT,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      const currentIndex = indexRef.current;
      onSwipeDownRef.current(dataRef.current[currentIndex]);
      
      // KEY: Swap the object reference. This ensures the NEXT card
      // rendered at this index uses a fresh 0 value, NOT the 
      // object we just animated to SCREEN_HEIGHT.
      swipeYRef.current = new Animated.Value(0);

      setIndex(currentIndex + 1);
      isSwipingRef.current = false;
    });
  };

  const forceSwipeUp = () => {
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;

    Animated.timing(swipeYRef.current, {
      toValue: -SCREEN_HEIGHT,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      const currentIndex = indexRef.current;
      onSwipeUpRef.current(dataRef.current[currentIndex]);
      swipeYRef.current = new Animated.Value(0);
      setIndex(currentIndex + 1);
      isSwipingRef.current = false;
    });
  };

  const getCardStyle = (
    rotateZ: Animated.AnimatedInterpolation<string | number>,
    swipeY: Animated.Value,
    swipeX: Animated.Value,
    stackY: Animated.AnimatedInterpolation<number>,
    stackX: Animated.AnimatedInterpolation<number>
  ) => {
    const swipeRotate = swipeY.interpolate({
      inputRange: [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
      outputRange: ['-10deg', '0deg', '10deg'],
    });

    return {
      transform: [
        { rotateZ }, // Stack rotation fan-out
        { translateY: stackY }, // Base stack vertical offset
        { translateY: swipeY }, // Vertical gesture
        { translateX: stackX }, // Base stack horizontal offset
        { translateX: swipeX }, // Horizontal gesture
        { rotate: swipeRotate }, // Vertical swipe subtle rotation
      ],
    };
  };

  const renderCards = () => {
    if (index >= data.length) return renderNoMoreCards();

    const lastVisible = Math.min(index + MAX_VISIBLE_CARDS, data.length);
    const topAnims = topAnimsRef.current;
    const cards: React.ReactNode[] = [];

    for (let i = lastVisible - 1; i >= index; i--) {
      const item = data[i];
      const isActive = i === index;

      const rotateZ = topAnims[i].interpolate({
        inputRange: [0, CARD_OFFSET * MAX_VISIBLE_CARDS],
        outputRange: ['0deg', '15deg'],
      });

      // "The more back, the higher it is". topAnims[i] is positive, so we negate it.
      const stackY = topAnims[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2],
      });

      const stackX = topAnims[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2],
      });

      cards.push(
        <Animated.View
          key={item.id}
          style={[
            styles.cardStyle,
            { zIndex: data.length - i },
            isActive
              ? getCardStyle(rotateZ, swipeYRef.current, swipeXRef.current, stackY, stackX)
              : { transform: [{ rotateZ }, { translateY: stackY }, { translateX: stackX }] },
          ]}
          {...(isActive ? panResponder.panHandlers : undefined)}
        >
          {renderCard(item, isActive)}
        </Animated.View>
      );
    }
    return cards;
  };

  return <View style={styles.deck}>{renderCards()}</View>;
};

export default Stack

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    position: "absolute",
  },
})