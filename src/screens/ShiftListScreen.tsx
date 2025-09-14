// src/screens/ShiftListScreen.tsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, FlatList } from 'react-native';
import { shiftStore } from '../stores/shiftStore';

const ShiftListScreen = observer(() => {
  useEffect(() => {
    shiftStore.fetchShifts();
  }, []);

  if (shiftStore.loading) return <Text>Загрузка...</Text>;
  if (shiftStore.error) return <Text>{shiftStore.error}</Text>;

  return (
    <FlatList
      data={shiftStore.shifts}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        console.log('айтем', item);
        return (
          <View
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.companyName}
            </Text>
            <Text>{item.address}</Text>
            <Text>{item.dateStartByCity}</Text>
            <Text>{item.priceWorker} ₽</Text>
          </View>
        );
      }}
    />
  );
});

export default ShiftListScreen;
