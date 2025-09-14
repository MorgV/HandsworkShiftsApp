// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ShiftListScreen from './src/screens/ShiftListScreen';

export default function App() {
  return (
    <NavigationContainer>
      <ShiftListScreen />
    </NavigationContainer>
  );
}
