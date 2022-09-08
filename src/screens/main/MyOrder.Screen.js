import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icons from 'react-native-vector-icons/Feather';

import { BLACK } from '../../utils/constants';

import globalStyles from '../../utils/globalStyles';

import Receipt from '../../components/MyOrder/Receipt.Component';

const styles = StyleSheet.create({
  menuIcon: {
    paddingRight: 10,
    paddingLeft: 12,
  },
});

class MyOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dayOrders: [],
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalOrder !== this.props.totalOrder &&
      this.props.totalOrder === 0
    ) {
      // then it means we've just sent a new order (also called if we reset totalOrder to 0 from Home.Screen unfortunately)
      this.fetchOrders();
    }
  }

  fetchOrders = () => {
    AsyncStorage.getItem('currentOrder')
      .then(data => {
        this.setState({ dayOrders: JSON.parse(data) });
      })
      .catch(e => console.error('failed to fetch the orders: ', e));
  };

  render() {
    const { dayOrders } = this.state;

    return (
      <SafeAreaView style={globalStyles.screen}>
        {/* header */}
        <View style={{ flexDirection: 'row' }}>
          <Icons
            name="menu"
            color={BLACK}
            size={17}
            onPress={this.props.navigation.openDrawer}
            style={styles.menuIcon}
          />

          <Text style={{ fontSize: 21, color: BLACK, lineHeight: 21 }}>
            My Order
          </Text>
        </View>

        {/* body */}
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {dayOrders.map(dayMeals => {
            return <Receipt key={dayMeals.index} dayMeals={dayMeals} />;
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

MyOrder.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  totalOrder: PropTypes.number.isRequired,
};

const mapStateToProps = ({ orders }) => ({
  totalOrder: orders.totalOrder,
});

export default connect(mapStateToProps)(MyOrder);

/*
THE DATA LOOKS LIKE THIS

const hmm = [
  [
    [
      { id: '3', mealName: 'Chapati', quantity: 1 },
      { id: '1', mealName: 'Queencake', quantity: 1 },
      { id: '2', mealName: 'Samosa', quantity: 2 },
    ],
    [],
  ],
];
*/
