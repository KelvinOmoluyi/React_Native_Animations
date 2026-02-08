import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigations/StackNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView> 
  );
}
