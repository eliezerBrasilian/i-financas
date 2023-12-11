import {FlatList, View} from 'react-native';

import React from 'react';
import {Loading} from '../../../components/Loading';
import {TextContent} from '../../../components/TextContent';
import {HeaderOfMainView} from './HeaderOfMainView';
import Register from './Register';

export const MainView = ({
  registers,
  date,
  incrementMonth,
  decrementMonth,
  loading,
}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <HeaderOfMainView
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />

      <View
        style={{borderWidth: 1, borderColor: '#d9d9d9', marginHorizontal: 30}}
      />
      <View style={{flex: 1, marginHorizontal: 20, marginTop: 20}}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={registers}
            renderItem={({item}) => <Register data={item} />}
            contentContainerStyle={{rowGap: 10}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View>
                <TextContent>Nenhum registro</TextContent>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};
