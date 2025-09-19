import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../styles/theme';

type Props = {
  label: string;
  value: string | number;
  isPrice?: boolean;
};

const DetailRow: React.FC<Props> = React.memo(({ label, value, isPrice }) => (
  <View style={styles.block}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, isPrice && styles.price]}>{value}</Text>
  </View>
));

const styles = StyleSheet.create({
  block: { marginBottom: spacing.md, alignSelf: 'flex-start' },
  label: typography.caption,
  value: typography.body,
  price: typography.price,
});
export default DetailRow;
