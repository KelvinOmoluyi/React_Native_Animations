import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../App/Home';
import Example1 from '../App/animations/Example1';
import SwipeCards from '../App/animations/SwipeCards';
import MovableCard from '../App/animations/MovableCard';
import WeatherForecastCard from '@/App/animations/WeatherForecastCard';
import GlassyBottomSheet from '@/App/animations/GlassyBottomSheet';
import MotivationCard from '@/App/animations/MotivationCard';
import GameLoader from '@/App/animations/GameLoader';
import CircularControl from '@/App/animations/CircularControl';
import StackableCards from '@/App/animations/StackableCards';
import TouristCard from '@/App/animations/TouristCard';

export type RootStackParamList = {
  Home: undefined;
  Example1: undefined;
  SwipeCards: undefined;
  MovableCard: undefined;
  WeatherForecastCard: undefined;
  GlassyBottomSheet: undefined;
  MotivationCard: undefined;
  GameLoader: undefined;
  CircularControl: undefined;
  StackableCards: undefined;
  TouristCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Animations' }} />
      <Stack.Screen name="Example1" component={Example1} />
      <Stack.Screen name="SwipeCards" component={SwipeCards} />
      <Stack.Screen name="MovableCard" component={MovableCard} />
      <Stack.Screen name="WeatherForecastCard" component={WeatherForecastCard} />
      <Stack.Screen name="GlassyBottomSheet" component={GlassyBottomSheet} />
      <Stack.Screen name="MotivationCard" component={MotivationCard} />
      <Stack.Screen name="GameLoader" component={GameLoader} />
      <Stack.Screen name="CircularControl" component={CircularControl} />
      <Stack.Screen name="StackableCards" component={StackableCards} />
      <Stack.Screen name="TouristCard" component={TouristCard} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
