import axios from 'axios';

const BASE_URL = 'https://mobile.handswork.pro/api';

export async function getShifts(latitude: number, longitude: number) {
  try {
    const response = await axios.get(
      `${BASE_URL}/shifts/map-list-unauthorized`,
      {
        params: { latitude, longitude },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке смен:', error);
    throw error;
  }
}
