import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftStore } from '../stores/shiftStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ShiftCard from '../components/ShiftCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const ShiftListScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    shiftStore.fetchShifts();
  }, []);

  const handlePress = useCallback(
    (id: string) => navigation.navigate('ShiftDetail', { shiftId: id }),
    [navigation],
  );

  const renderShift = useCallback(
    ({ item }: { item: (typeof shiftStore.shifts)[0] }) => (
      <ShiftCard shift={item} onPress={() => handlePress(item.id)} />
    ),
    [handlePress],
  );

  if (shiftStore.isLoading) return <Loader text="Загрузка смен..." />;
  if (shiftStore.hasError) return <ErrorMessage message={shiftStore.error!} />;

  return (
    <FlatList
      data={shiftStore.shifts.slice()}
      keyExtractor={item => item.id}
      renderItem={renderShift}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      updateCellsBatchingPeriod={50}
      removeClippedSubviews
    />
  );
});

export default ShiftListScreen;
