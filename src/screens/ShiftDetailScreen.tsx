import React from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { shiftStore } from '../stores/shiftStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { observer } from 'mobx-react-lite';

type ShiftDetailRouteProp = RouteProp<RootStackParamList, 'ShiftDetail'>;

const ShiftDetailScreen = observer(() => {
  const route = useRoute<ShiftDetailRouteProp>();
  const { shiftId } = route.params;

  const shift = shiftStore.shifts.find(s => s.id === shiftId);

  if (!shift) return <Text>Смена не найдена</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image
        source={{ uri: shift.logo }}
        style={{ width: 100, height: 100, marginBottom: 16 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
        {shift.companyName}
      </Text>
      <Text>Адрес: {shift.address}</Text>
      <Text>Дата: {shift.dateStartByCity}</Text>
      <Text>
        Время: {shift.timeStartByCity} - {shift.timeEndByCity}
      </Text>
      <Text>Заработок: {shift.priceWorker} ₽</Text>
      <Text>
        Набрано / Требуется: {shift.currentWorkers} / {shift.planWorkers}
      </Text>
      <Text>
        Рейтинг: {shift.customerRating} ({shift.customerFeedbacksCount})
      </Text>
      <Text>Тип работы: {shift.workTypes.map(w => w.name).join(', ')}</Text>
    </ScrollView>
  );
});

export default ShiftDetailScreen;
