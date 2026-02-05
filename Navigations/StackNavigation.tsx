import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../App/Home';
import Example1 from '../App/animations/Example1';

export type RootStackParamList = {
  Home: undefined;
  Example1: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Animations' }} />
      <Stack.Screen name="Example1" component={Example1} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
