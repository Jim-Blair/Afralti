import React, { Component } from 'react';
import { Text, View, Easing, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import AnimatedNumbers from 'react-native-animated-numbers';

import { TAN, GREEN } from '../../utils/constants';
import {
  addMealItem,
  breakfastOrder,
  lunchOrder,
  minusMealItem,
} from '../../utils/Order';

import { addItemAct, removeItemAct } from '../../redux/order/order.actions';

const styles = StyleSheet.create({
  minus: {
    borderWidth: 0.5,
    borderColor: '#A8A29E',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 3,
  },
  quantity: {
    fontSize: 22,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#57534E',
  },
  plus: {
    borderWidth: 0.5,
    borderColor: '#D6D3D1',
    borderRadius: 15,
    backgroundColor: TAN,
    padding: 3,
  },
});

class QuantitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    this.tallyItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalOrder !== this.props.totalOrder) {
      this.tallyItem();
    }
  }

  tallyItem = () => {
    const { id, kind } = this.props;
    let idx = -1;

    if (kind === 'brkfst') {
      idx = breakfastOrder.findIndex(m => m.id === id);
    } else {
      idx = lunchOrder.findIndex(m => m.id === id);
    }

    if (idx !== -1) {
      if (kind === 'brkfst') {
        this.setState({ selected: breakfastOrder[idx].quantity });
      } else {
        this.setState({ selected: lunchOrder[idx].quantity });
      }
    } else {
      // important for when we remove an item from Checkout
      this.setState({ selected: 0 });
    }
  };

  addQuantity = () => {
    const { id, mealName, kind } = this.props;

    this.props.addItemAct();
    addMealItem({ id, mealName, kind });
  };

  minusQuantity = () => {
    const { selected } = this.state;
    const { id, kind, hideItem } = this.props;

    if (selected > 0) {
      minusMealItem({ id, kind });
      this.props.removeItemAct();

      if (selected === 1) {
        if (hideItem) {
          hideItem();
        }
      }
    }
  };

  render() {
    const { selected } = this.state;
    console.log('rendered');

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icons
          name="minus"
          color={GREEN}
          size={22}
          style={styles.minus}
          onPress={this.minusQuantity}
        />
        {/* <Text style={styles.quantity}>{selected}</Text> */}
        <AnimatedNumbers
          animateToNumber={selected}
          animationDuration={200}
          easing={Easing.linear}
          fontStyle={styles.quantity}
        />
        <Icons
          name="plus"
          color={GREEN}
          size={24}
          style={styles.plus}
          onPress={this.addQuantity}
        />
      </View>
    );
  }
}

QuantitySelector.propTypes = {
  id: PropTypes.string.isRequired,
  mealName: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  totalOrder: PropTypes.number.isRequired,
  addItemAct: PropTypes.func.isRequired,
  removeItemAct: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  hideItem: PropTypes.func,
};

const mapStateToProps = ({ orders }) => ({
  totalOrder: orders.totalOrder,
});

export default connect(mapStateToProps, { addItemAct, removeItemAct })(
  QuantitySelector,
);
