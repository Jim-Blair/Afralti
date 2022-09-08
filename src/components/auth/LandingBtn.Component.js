import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {GREEN, TAN, BLACK} from '../../utils/constants';

const styles = StyleSheet.create({
  cont: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
  },
  txt: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 28,
  },
});

function LandingBtn({title, signin, navigateTo}) {
  return (
    <TouchableOpacity
      onPress={navigateTo}
      style={[
        signin ? {backgroundColor: GREEN} : {backgroundColor: TAN},
        styles.cont,
      ]}>
      <Text style={[signin ? {color: TAN} : {color: BLACK}, styles.txt]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default LandingBtn;
