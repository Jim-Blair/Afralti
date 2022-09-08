import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import SkeletonContent from 'react-native-skeleton-content';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import AnimatedNumbers from 'react-native-animated-numbers';
import Icons from 'react-native-vector-icons/Feather';

import { TAN, GREEN } from '../../utils/constants';

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

class MyOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 3000);
  }

  addQuantity = () => {
    this.setState({ selected: this.state.selected + 1 });
  };

  minusQuantity = () => {
    this.setState({ selected: this.state.selected - 1 });
  };

  render() {
    const { visible, selected } = this.state;

    return (
      <View>
        <Text>My Order</Text>
        <ShimmerPlaceHolder
          visible={visible}
          style={{
            borderRadius: 5,
            padding: 0,
            alignSelf: 'flex-start',
          }}
          width={100}
          LinearGradient={LinearGradient}>
          <Text>Hello</Text>
        </ShimmerPlaceHolder>

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
            animationDuration={800}
            // easing={Easing.linear}
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
      </View>
    );
  }
}

export default MyOrder;
