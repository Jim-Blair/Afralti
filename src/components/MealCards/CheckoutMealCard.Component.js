import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';

import QuantitySelector from './QuantitySelector.Component';

import rice from '../../images/rice.jpg';

import { BLACK, LIGHT_TAN, GREEN } from '../../utils/constants';
import { breakfastOrder, lunchOrder, minusMealItem } from '../../utils/Order';

import { removeItemAct } from '../../redux/order/order.actions';

const styles = StyleSheet.create({
  foodTitle: { color: BLACK, fontSize: 20, marginTop: 2, marginBottom: 8 },
});

class CheckoutMealCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  hideItem = () => {
    this.setState({ display: false });
  };

  deleteSelection = () => {
    const { id, kind } = this.props;

    let idx = -1;

    if (kind === 'brkfst') {
      idx = breakfastOrder.findIndex(m => m.id === id);
    } else {
      idx = lunchOrder.findIndex(m => m.id === id);
    }

    if (idx !== -1) {
      let quantity;

      if (kind === 'brkfst') {
        quantity = breakfastOrder[idx].quantity;
      } else {
        quantity = lunchOrder[idx].quantity;
      }

      for (let i = 0; i < quantity; i++) {
        minusMealItem({ id, kind });
        this.props.removeItemAct();
      }

      this.hideItem();
    }
  };

  render() {
    const { display } = this.state;
    const { id, mealName, kind } = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: LIGHT_TAN,
          borderRadius: 7,
          marginBottom: 16,
          display: display ? 'flex' : 'none',
        }}>
        <Image
          source={rice}
          style={{
            flex: 1,
            height: 88,
            borderRadius: 4,
            // margin: 1.5,
            borderWidth: 2,
            borderColor: LIGHT_TAN,
          }}
        />
        <View style={{ flex: 2, paddingLeft: 10 }}>
          <Text style={styles.foodTitle}>{mealName}</Text>
          <QuantitySelector
            id={id}
            mealName={mealName}
            kind={kind}
            hideItem={this.hideItem}
          />

          <Icons
            name="trash"
            color={LIGHT_TAN}
            size={17}
            onPress={this.deleteSelection}
            style={{
              backgroundColor: GREEN,
              alignSelf: 'flex-end',
              borderBottomRightRadius: 7,
              borderTopLeftRadius: 7,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}
          />
        </View>
      </View>
    );
  }
}

CheckoutMealCard.propTypes = {
  id: PropTypes.string.isRequired,
  mealName: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  // imgSrc: PropTypes.any.isRequired,
  removeItemAct: PropTypes.func.isRequired,
};

export default connect(null, { removeItemAct })(CheckoutMealCard);
