import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ShiftListScreen from '../screens/ShiftListScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';

export type RootStackParamList = {
  ShiftList: undefined;
  ShiftDetail: { shiftId: string }; // передаём id выбранной смены
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ShiftList"
          component={ShiftListScreen}
          options={{ title: 'Смены' }}
        />
        <Stack.Screen
          name="ShiftDetail"
          component={ShiftDetailScreen}
          options={{ title: 'Детали смены' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
