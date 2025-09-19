import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Shift } from '../types/types';
import { colors, spacing, typography } from '../styles/theme';

type Props = {
  shift: Shift;
  onPress: () => void;
};

const ShiftCard: React.FC<Props> = React.memo(({ shift, onPress }) => {
  4;
  console.log('rerender', shift.id, shift.companyName, shift.priceWorker);
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {shift.logo && (
        <Image source={{ uri: shift.logo }} style={styles.logoSmall} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.company}>{shift.companyName}</Text>
        <Text style={styles.address}>{shift.address}</Text>
        <Text style={styles.date}>
          {shift.dateStartByCity} | {shift.timeStartByCity} -{' '}
          {shift.timeEndByCity}
        </Text>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 3,
    gap: spacing.md,
  },
  logoSmall: { width: 60, height: 60, borderRadius: 8 },
  company: { ...typography.subtitle, marginBottom: spacing.xs },
  address: typography.caption,
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginVertical: spacing.sm,
  },
  price: typography.price,
});

export default ShiftCard;
