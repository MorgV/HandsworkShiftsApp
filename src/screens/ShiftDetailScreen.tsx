import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { shiftStore } from '../stores/shiftStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { observer } from 'mobx-react-lite';
import DetailRow from '../components/DetailRow';
import { spacing, typography } from '../styles/theme';

type ShiftDetailRouteProp = RouteProp<RootStackParamList, 'ShiftDetail'>;

const ShiftDetailScreen = observer(() => {
  const route = useRoute<ShiftDetailRouteProp>();
  const { shiftId } = route.params;

  const shift = shiftStore.getShiftById(shiftId);

  if (!shift) return <Text style={styles.error}>Смена не найдена</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: shift.logo }} style={styles.logoBig} />
      <Text style={styles.company}>{shift.companyName}</Text>

      <DetailRow label="Адрес:" value={shift.address} />
      <DetailRow label="Дата:" value={shift.dateStartByCity} />
      <DetailRow
        label="Время:"
        value={`${shift.timeStartByCity} - ${shift.timeEndByCity}`}
      />
      <DetailRow label="Заработок:" value={`${shift.priceWorker} ₽`} isPrice />
      <DetailRow
        label="Набрано / Требуется:"
        value={`${shift.currentWorkers} / ${shift.planWorkers}`}
      />
      <DetailRow
        label="Рейтинг:"
        value={`${shift.customerRating} (${shift.customerFeedbacksCount})`}
      />
      <DetailRow
        label="Тип работы:"
        value={shift.workTypes.map(w => w.name).join(', ')}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  error: {
    ...typography.error,
    flex: 1,
    textAlign: 'center',
    marginTop: spacing.xl * 2,
  },
  container: { padding: spacing.lg, alignItems: 'center' },
  logoBig: {
    width: 160,
    height: 160,
    marginBottom: spacing.lg,
    borderRadius: 20,
    alignSelf: 'center',
  },
  company: { ...typography.title, marginBottom: spacing.lg },
});

export default ShiftDetailScreen;
