import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import AnimatedNumbers from 'react-native-animated-numbers';

import { TAN, GREEN } from '../../utils/constants';
import { addMealItem, minusMealItem } from '../../utils/Order';

import { addItemAct, removeItemAct } from '../../redux/order/order.actions';

const styles = StyleSheet.create({
  minus: {
    borderWidth: 0.5,
    borderColor: '#A8A29E',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 4,
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
    padding: 3.5,
  },
});

class QuantitySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  addQuantity = () => {
    const { id, mealName, kind } = this.props;

    this.setState(prevState => ({ selected: prevState.selected + 1 })); // increment locally
    this.props.addItemAct(); // add total
    addMealItem({ id, mealName, kind }); // construct array
  };

  minusQuantity = () => {
    const { selected } = this.state;
    const { id, kind } = this.props;

    if (selected > 0) {
      this.setState(prevState => ({ selected: prevState.selected - 1 })); // decrement locally
      this.props.removeItemAct(); // reduce total
      minusMealItem({ id, kind }); // update array
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
        <AnimatedNumbers
          animateToNumber={selected}
          animationDuration={800}
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
  addItemAct: PropTypes.func.isRequired,
  removeItemAct: PropTypes.func.isRequired,
};

export default connect(null, { addItemAct, removeItemAct })(QuantitySelector);
