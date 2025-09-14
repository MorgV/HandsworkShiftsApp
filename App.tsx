import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getShifts } from './src/api/shiftsApi';

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Доступ к геолокации',
        message:
          'Приложению нужен доступ к вашей геолокации для показа смен рядом',
        buttonNeutral: 'Спросить позже',
        buttonNegative: 'Отмена',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS сам спросит
}

export default function App() {
  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          async pos => {
            const { latitude, longitude } = pos.coords;
            console.log('Координаты:', latitude, longitude);

            getShifts(55.7558, 37.6173) // мок так как в моем городе нет смен
              .then(shifts => {
                console.log('Список смен:', shifts);
              })
              .catch(err => {
                console.error('Ошибка при получении смен:', err);
              });
          },
          error => {
            console.error('Ошибка геолокации:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })();
  }, []);

  return null;
}
