// src/stores/shiftStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { getShifts } from '../api/shiftsApi';
import { Shift } from '../types/types';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') return true; // iOS разрешения обрабатываются через plist

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Разрешение на геолокацию',
      message: 'Приложению нужно ваше разрешение, чтобы показывать смены рядом',
      buttonPositive: 'OK',
      buttonNegative: 'Отмена',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export const shiftStore = makeAutoObservable({
  shifts: [] as Shift[],
  loading: false,
  error: null as string | null,

  fetchShifts: async function () {
    this.loading = true;
    this.error = null;

    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Нет разрешения на геолокацию');
      }

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await getShifts(latitude, longitude);
            runInAction(() => {
              this.shifts = response.data;
              this.loading = false;
            });
          } catch (apiError) {
            runInAction(() => {
              this.error = 'Ошибка при загрузке смен';
              this.loading = false;
            });
          }
        },
        geoError => {
          runInAction(() => {
            this.error = `Ошибка геолокации: ${geoError.message}`;
            this.loading = false;
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (err) {
      runInAction(() => {
        this.error = (err as Error).message || 'Ошибка при загрузке смен';
        this.loading = false;
      });
    }
  },

  getShiftById(id: string) {
    return this.shifts.find(s => s.id === id);
  },

  get isLoading(): boolean {
    return this.loading;
  },

  get hasError(): boolean {
    return this.error !== null;
  },
});
