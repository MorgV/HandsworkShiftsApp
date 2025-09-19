import { makeAutoObservable, runInAction } from 'mobx';
import { getShifts } from '../api/shiftsApi';
import { Shift } from '../types/types';

export const shiftStore = makeAutoObservable({
  shifts: [] as Shift[], // массив смен
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
