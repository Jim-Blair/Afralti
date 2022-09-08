/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedNumbers from 'react-native-animated-numbers';

import HomeMealCard from '../../components/MealCards/HomeMealCard.Component';

import { BLACK, GREEN, TAN } from '../../utils/constants';

import Beef from '../../images/beef.jpg';
import Chapati from '../../images/chapati.jpg';
import Fries from '../../images/fries.jpg';
import Pancake from '../../images/pancake.jpg';
import QCake from '../../images/queencakes.jpg';
import Rice from '../../images/rice.jpg';
import Salad from '../../images/salad.jpg';
import Samosa from '../../images/samosa.jpg';
import globalStyles from '../../utils/globalStyles';

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  menuIcon: {
    paddingRight: 10,
    paddingLeft: 12,
  },
  greeting: { fontSize: 20, lineHeight: 20, color: BLACK },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 25,
    color: BLACK,
  },
  checkoutBtn: {
    backgroundColor: GREEN,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 5,
    paddingLeft: 12,
  },
  checkoutContent: {
    flexDirection: 'row',
  },
  checkoutTxt: {
    color: TAN,
    fontSize: 17,
  },
  scrll: {
    paddingHorizontal: 12,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    color: BLACK,
  },
});

const menu = {
  breakfast: [
    [
      {
        id: '1',
        imgSrc: QCake,
        mealName: 'Queencake',
      },
      {
        id: '2',
        imgSrc: Samosa,
        mealName: 'Samosa',
      },
    ],
    [
      {
        id: '3',
        imgSrc: Chapati,
        mealName: 'Chapati',
      },
      {
        id: '4',
        imgSrc: Pancake,
        mealName: 'Pancake',
      },
    ],
    [
      {
        id: '5',
        imgSrc: QCake,
        mealName: 'Queencake',
      },
      {
        id: '6',
        imgSrc: Samosa,
        mealName: 'Samosa',
      },
    ],
    [
      {
        id: '7',
        imgSrc: Chapati,
        mealName: 'Chapati',
      },
      {
        id: '8',
        imgSrc: Pancake,
        mealName: 'Pancake',
      },
    ],
  ],
  lunch: [
    [
      {
        id: '9',
        imgSrc: Salad,
        mealName: 'Salad',
      },
      {
        id: '10',
        imgSrc: Beef,
        mealName: 'Beef',
      },
    ],
    [
      {
        id: '11',
        imgSrc: Fries,
        mealName: 'Fries',
      },
      {
        id: '12',
        imgSrc: Rice,
        mealName: 'Rice',
      },
    ],
    [
      {
        id: '13',
        imgSrc: Salad,
        mealName: 'Salad',
      },
      {
        id: '14',
        imgSrc: Beef,
        mealName: 'Beef',
      },
    ],
    [
      {
        id: '15',
        imgSrc: Fries,
        mealName: 'Fries',
      },
      {
        id: '16',
        imgSrc: Rice,
        mealName: 'Rice',
      },
    ],
  ],
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '',
      username: '',
      showItems: false,
    };
  }

  componentDidMount() {
    this.setState({ greeting: this.getGreeting() });

    AsyncStorage.getItem('username')
      .then(username => {
        this.setState({ username });
      })
      .catch(e => {
        console.error('failed to fetch username: ', e);
      });

    setTimeout(() => {
      this.setState({ showItems: true });
    }, 3000);
  }

  getGreeting = () => {
    const dt = new Date();
    const hr = dt.getHours();

    if (hr < 12) {
      return 'Good Morning';
    }
    if (hr < 16) {
      return 'Good Afternoon';
    }
    return 'Good Evening';
  };

  render() {
    const { username, greeting, showItems } = this.state;
    const { totalOrder } = this.props;

    return (
      <View style={globalStyles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <Icons
              name="menu"
              color={BLACK}
              size={17}
              onPress={this.props.navigation.openDrawer}
              style={styles.menuIcon}
            />

            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.username}>{username}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              if (totalOrder > 0) {
                this.props.navigation.push('CheckoutReceipt');
              }
            }}>
            <View style={styles.checkoutContent}>
              <AnimatedNumbers
                animateToNumber={totalOrder}
                fontStyle={[styles.checkoutTxt, { fontWeight: 'bold' }]}
              />
              <Text style={styles.checkoutTxt}> Checkout</Text>
              <Icons
                name="chevron-right"
                color={TAN}
                size={22}
                onPress={this.props.navigation.openDrawer}
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrll}>
          <Text style={styles.mealTitle}>Breakfast</Text>
          <ScrollView horizontal>
            {menu.breakfast.map(meal => {
              return (
                <View key={meal[0].id}>
                  <HomeMealCard
                    {...meal[0]}
                    kind="brkfst"
                    showItems={showItems}
                  />
                  <HomeMealCard
                    {...meal[1]}
                    kind="brkfst"
                    showItems={showItems}
                  />
                </View>
              );
            })}
          </ScrollView>

          <Text style={styles.mealTitle}>Lunch</Text>
          <ScrollView horizontal>
            {menu.lunch.map(meal => {
              return (
                <View key={meal[0].id}>
                  <HomeMealCard
                    {...meal[0]}
                    kind="lunch"
                    showItems={showItems}
                  />
                  <HomeMealCard
                    {...meal[1]}
                    kind="lunch"
                    showItems={showItems}
                  />
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  totalOrder: PropTypes.number.isRequired,
};

const mapStateToProps = ({ orders }) => ({
  totalOrder: orders.totalOrder,
});

export default connect(mapStateToProps)(Home);
