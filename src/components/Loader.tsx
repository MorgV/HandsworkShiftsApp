// src/components/Loader.tsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loader = ({ text = 'Загрузка...' }) => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#4A90E2" />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 8, fontSize: 16, color: '#555' },
});

export default Loader;
