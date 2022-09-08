import React from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';

import globalStyles from '../../utils/globalStyles';
import { BLACK } from '../../utils/constants';

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});

function Back({ title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cont}>
        <Icons name="chevron-left" color={BLACK} size={28} />
        <Text style={globalStyles.backTxt}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

Back.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Back;
