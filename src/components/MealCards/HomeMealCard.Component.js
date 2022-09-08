import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import QuantitySelector from './QuantitySelector.Component';

import { BLACK, LIGHT_TAN } from '../../utils/constants';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: 150,
    backgroundColor: LIGHT_TAN,
    padding: 5,
    marginRight: 16,
    marginBottom: 24,
  },
  img: { height: 100, width: 140, borderRadius: 5 },
  foodTitle: { color: BLACK, fontSize: 18, marginTop: 2, marginBottom: 8 },
});

function HomeMealCard({ id, mealName, imgSrc, kind }) {
  return (
    <View style={styles.card}>
      <Image source={imgSrc} style={styles.img} />
      <Text style={styles.foodTitle}>{mealName}</Text>
      <QuantitySelector id={id} mealName={mealName} kind={kind} />
    </View>
  );
}

HomeMealCard.propTypes = {
  id: PropTypes.string.isRequired,
  mealName: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  imgSrc: PropTypes.any.isRequired,
};

export default HomeMealCard;
