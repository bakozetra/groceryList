import React from 'react';
import { View , Text } from 'react-native';
import { useCurrentList } from '../util/ListManager';
export default () => {
  const {favourites} = useCurrentList()
  console.log("favourites" , favourites);
  return (
  <View>
    <Text>HEloo</Text>
  </View>
  )
}
