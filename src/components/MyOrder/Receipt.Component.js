/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import TearLines from 'react-native-tear-lines';
import ReceiptItem from '../MealCards/ReceiptItem.Component';

import globalStyles from '../../utils/globalStyles';
import { TAN } from '../../utils/constants';

class Receipt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dayMeals } = this.props;

    return (
      <View style={{ marginBottom: 16 }}>
        <TearLines
          ref={c => {
            this.top = c;
          }}
          color="#FFFFFF"
          backgroundColor={TAN}
        />
        <View
          style={globalStyles.receiptCont}
          onLayout={e => {
            this.top.onLayout(e);
            this.bottom.onLayout(e);
          }}>
          {dayMeals[0].length > 0 && (
            <Text style={globalStyles.mealTitle}>Breakfast</Text>
          )}
          {dayMeals[0].map(meal => {
            return (
              <ReceiptItem
                key={meal.id}
                mealName={meal.mealName}
                quantity={meal.quantity}
              />
            );
          })}

          {dayMeals[1].length > 0 && (
            <Text style={globalStyles.mealTitle}>Lunch</Text>
          )}
          {dayMeals[1].map(meal => {
            return (
              <ReceiptItem
                key={meal.id}
                mealName={meal.mealName}
                quantity={meal.quantity}
              />
            );
          })}
        </View>

        <TearLines
          isUnder
          ref={c => {
            this.bottom = c;
          }}
          color="#FFFFFF"
          backgroundColor={TAN}
        />
      </View>
    );
  }
}

export default Receipt;
