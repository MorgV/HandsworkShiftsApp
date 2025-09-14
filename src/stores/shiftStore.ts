import { makeAutoObservable, runInAction } from 'mobx';
import { getShifts } from '../api/shiftsApi';

export const shiftStore = makeAutoObservable({
  shifts: [] as any[], // массив смен
  loading: false,
  error: null as string | null,

  fetchShifts: async function () {
    this.loading = true;
    this.error = null;

    try {
      const response = await getShifts(55.7558, 37.6173); // мок координат
      runInAction(() => {
        this.shifts = response.data; // <- именно массив смен
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке смен';
        this.loading = false;
      });
    }
  },
});
