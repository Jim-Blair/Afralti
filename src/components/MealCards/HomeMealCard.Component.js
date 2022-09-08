import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

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
  foodTitle: { color: BLACK, fontSize: 18 },
});

function HomeMealCard({ id, mealName, imgSrc, kind, showItems }) {
  return (
    <View style={styles.card}>
      <ShimmerPlaceHolder
        visible={showItems}
        LinearGradient={LinearGradient}
        width={140}
        height={100}
        style={{ borderRadius: 5 }}>
        <Image source={imgSrc} style={styles.img} />
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={showItems}
        LinearGradient={LinearGradient}
        style={{ borderRadius: 5, marginTop: 2, marginBottom: 8 }}
        width={100}
        height={18}>
        <Text style={styles.foodTitle}>{mealName}</Text>
      </ShimmerPlaceHolder>
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
  showItems: PropTypes.bool.isRequired,
};

export default HomeMealCard;
