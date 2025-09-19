// src/components/ErrorMessage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }: { message: string }) => (
  <View style={styles.center}>
    <Text style={styles.error}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});

export default ErrorMessage;
