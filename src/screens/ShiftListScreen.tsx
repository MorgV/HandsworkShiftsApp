// src/screens/ShiftListScreen.tsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { shiftStore } from '../stores/shiftStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const ShiftListScreen = observer(() => {
  useEffect(() => {
    shiftStore.fetchShifts();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (shiftStore.loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Загрузка смен...</Text>
      </View>
    );
  }

  if (shiftStore.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{shiftStore.error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shiftStore.shifts}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('ShiftDetail', { shiftId: item.id })
          }
        >
          <Image source={{ uri: item.logo }} style={styles.logoSmall} />
          <View style={{ flex: 1 }}>
            <Text style={styles.company}>{item.companyName}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.date}>
              {item.dateStartByCity} | {item.timeStartByCity} -{' '}
              {item.timeEndByCity}
            </Text>
            <Text style={styles.price}>{item.priceWorker} ₽</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 8, fontSize: 16, color: '#555' },
  errorText: { color: 'red', fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    gap: 12,
  },
  logoSmall: { width: 60, height: 60, borderRadius: 8 },
  company: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  address: { fontSize: 14, color: '#555' },
  date: { fontSize: 14, color: '#777', marginVertical: 6 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#4A90E2' },
});

export default ShiftListScreen;
