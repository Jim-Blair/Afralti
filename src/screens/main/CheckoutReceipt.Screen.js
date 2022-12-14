import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TearLines from 'react-native-tear-lines';

import Back from '../../components/Shared/Back.Component';

import { BLACK, GREEN, LIGHT_TAN, TAN } from '../../utils/constants';

import { breakfastOrder, lunchOrder, resetOrder } from '../../utils/Order';
import { resetItemsAct } from '../../redux/order/order.actions';

import ReceiptItem from '../../components/MealCards/ReceiptItem.Component';

import globalStyles from '../../utils/globalStyles';

const styles = StyleSheet.create({
  date: { fontFamily: 'IBMMed', marginTop: 5 },
  line: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: BLACK,
    height: 2,
    width: '80%',
  },
  btn: {
    backgroundColor: GREEN,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  btnTxt: {
    color: LIGHT_TAN,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 20,
  },
});

class CheckoutReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  confirmOrder = async () => {
    const { date } = this.state;

    try {
      const currentOrder = await AsyncStorage.getItem('currentOrder');

      let currentArray;

      if (!currentOrder) {
        // i.e first time task ran
        currentArray = [];
      } else {
        currentArray = JSON.parse(currentOrder);
      }

      currentArray.push([breakfastOrder, lunchOrder]);

      const stringOrder = JSON.stringify(currentArray);

      const orderDate = ['orderDate', date.toLocaleDateString()];
      const theOrder = ['currentOrder', stringOrder];
      await AsyncStorage.multiSet([orderDate, theOrder]);

      this.props.resetItemsAct();
      resetOrder();

      ToastAndroid.show('Your order has been sent', ToastAndroid.SHORT);

      setTimeout(() => {
        this.props.navigation.pop();
      }, 1000);
    } catch (e) {
      console.error('failed to store order: ', e);
    }
  };

  render() {
    const { date } = this.state;
    const { totalOrder } = this.props;

    return (
      <SafeAreaView style={{ backgroundColor: TAN, height: '100%' }}>
        <Back
          onPress={() => this.props.navigation.pop()}
          title="Here's your order"
        />

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 8, marginTop: 30 }}>
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
              <Text style={styles.date}>{date.toDateString()}</Text>

              {breakfastOrder.length > 0 && (
                <Text style={globalStyles.mealTitle}>Breakfast</Text>
              )}
              {breakfastOrder.map(meal => {
                return (
                  <ReceiptItem
                    key={meal.id}
                    mealName={meal.mealName}
                    quantity={meal.quantity}
                  />
                );
              })}

              {lunchOrder.length > 0 && (
                <Text style={[globalStyles.mealTitle, { marginTop: 30 }]}>
                  Lunch
                </Text>
              )}
              {lunchOrder.map(meal => {
                return (
                  <ReceiptItem
                    key={meal.id}
                    mealName={meal.mealName}
                    quantity={meal.quantity}
                  />
                );
              })}

              <View style={styles.line} />

              <ReceiptItem mealName="Total" quantity={totalOrder} />
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

          <TouchableOpacity style={styles.btn} onPress={this.confirmOrder}>
            <Text style={styles.btnTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

CheckoutReceipt.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
  totalOrder: PropTypes.number.isRequired,
  resetItemsAct: PropTypes.func.isRequired,
};

const mapStateToProps = ({ orders }) => ({
  totalOrder: orders.totalOrder,
});

export default connect(mapStateToProps, { resetItemsAct })(CheckoutReceipt);
