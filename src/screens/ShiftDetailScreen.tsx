// src/screens/ShiftDetailScreen.tsx
import React from 'react';
import { Text, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { shiftStore } from '../stores/shiftStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { observer } from 'mobx-react-lite';

type ShiftDetailRouteProp = RouteProp<RootStackParamList, 'ShiftDetail'>;

const ShiftDetailScreen = observer(() => {
  const route = useRoute<ShiftDetailRouteProp>();
  const { shiftId } = route.params;

  const shift = shiftStore.shifts.find(s => s.id === shiftId);

  if (!shift) return <Text style={styles.error}>Смена не найдена</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: shift.logo }} style={styles.logoBig} />
      <Text style={styles.company}>{shift.companyName}</Text>

      <View style={styles.block}>
        <Text style={styles.label}>Адрес:</Text>
        <Text style={styles.value}>{shift.address}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Дата:</Text>
        <Text style={styles.value}>{shift.dateStartByCity}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Время:</Text>
        <Text style={styles.value}>
          {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Заработок:</Text>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Набрано / Требуется:</Text>
        <Text style={styles.value}>
          {shift.currentWorkers} / {shift.planWorkers}
        </Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Рейтинг:</Text>
        <Text style={styles.value}>
          {shift.customerRating} ({shift.customerFeedbacksCount})
        </Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Тип работы:</Text>
        <Text style={styles.value}>
          {shift.workTypes.map(w => w.name).join(', ')}
        </Text>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  error: { flex: 1, textAlign: 'center', marginTop: 40, fontSize: 18 },
  container: { padding: 16, alignItems: 'center' },
  logoBig: {
    width: 160,
    height: 160,
    marginBottom: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  company: { fontWeight: 'bold', fontSize: 22, marginBottom: 16 },
  block: { marginBottom: 12, alignSelf: 'flex-start' },
  label: { fontSize: 14, color: '#555' },
  value: { fontSize: 16, color: '#000', marginTop: 2 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#4A90E2' },
});

export default ShiftDetailScreen;
