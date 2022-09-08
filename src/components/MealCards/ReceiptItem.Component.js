import React from 'react';
import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

function ReceiptItem({ mealName, quantity }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{ fontFamily: 'IBMMed' }}>{mealName}</Text>

      <Text style={{ fontFamily: 'IBMReg' }}>{quantity}</Text>
    </View>
  );
}

ReceiptItem.propTypes = {
  mealName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ReceiptItem;
