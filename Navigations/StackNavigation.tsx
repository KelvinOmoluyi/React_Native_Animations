import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../App/Home';
import Example1 from '../App/animations/Example1';
import SwipeCards from '../App/animations/SwipeCards';
import MovableCard from '../App/animations/MovableCard';

export type RootStackParamList = {
  Home: undefined;
  Example1: undefined;
  SwipeCards: undefined;
  MovableCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Animations' }} />
      <Stack.Screen name="Example1" component={Example1} />
      <Stack.Screen name="SwipeCards" component={SwipeCards} />
      <Stack.Screen name="MovableCard" component={MovableCard} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
