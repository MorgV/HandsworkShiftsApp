// src/screens/ShiftListScreen.tsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { shiftStore } from '../stores/shiftStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const ShiftListScreen = observer(() => {
  useEffect(() => {
    shiftStore.fetchShifts();
  }, []);

  if (shiftStore.loading) return <Text>Загрузка...</Text>;
  if (shiftStore.error) return <Text>{shiftStore.error}</Text>;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <FlatList
      data={shiftStore.shifts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ShiftDetail', { shiftId: item.id })
          }
        >
          <View
            style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.companyName}
            </Text>
            <Text>{item.address}</Text>
            <Text>
              {item.dateStartByCity} {item.timeStartByCity} -{' '}
              {item.timeEndByCity}
            </Text>
            <Text>{item.priceWorker} ₽</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

export default ShiftListScreen;
