/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BLACK, GREEN, LIGHT_TAN, TAN } from '../../utils/constants';

import Back from '../../components/Shared/Back.Component';
import CheckoutMealCard from '../../components/MealCards/CheckoutMealCard.Component';

import { breakfastOrder, lunchOrder } from '../../utils/Order';

const styles = StyleSheet.create({
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: BLACK,
  },
});

class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalOrder !== this.props.totalOrder &&
      this.props.totalOrder === 0
    ) {
      this.props.navigation.pop();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: TAN, height: '100%' }}>
        <Back
          onPress={() => this.props.navigation.pop()}
          title="Here's your order"
        />

        <ScrollView style={{ paddingHorizontal: 12 }}>
          {breakfastOrder.length > 0 && (
            <Text style={styles.mealTitle}>Breakfast</Text>
          )}
          {breakfastOrder.map(meal => {
            return <CheckoutMealCard key={meal.id} {...meal} kind="brkfst" />;
          })}

          {lunchOrder.length > 0 && (
            <Text style={[styles.mealTitle, { marginTop: 60 }]}>Lunch</Text>
          )}
          {lunchOrder.map(meal => {
            return <CheckoutMealCard key={meal.id} {...meal} kind="lunch" />;
          })}

          <TouchableOpacity
            disabled={lunchOrder.length > 0 || breakfastOrder.length > 0}
            style={{
              backgroundColor: GREEN,
              borderRadius: 8,
              alignSelf: 'flex-end',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: LIGHT_TAN,
                paddingHorizontal: 8,
                paddingVertical: 4,
                fontSize: 20,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Checkout.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
  totalOrder: PropTypes.number.isRequired,
};

const mapStateToProps = ({ orders }) => ({
  totalOrder: orders.totalOrder,
});

export default connect(mapStateToProps)(Checkout);
