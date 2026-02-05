import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigations/StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
