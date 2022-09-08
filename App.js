import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Landing from './src/screens/Landing.Screen';
import SignIn from './src/screens/auth/SignIn.Screen';
import SignUp from './src/screens/auth/SignUp.Screen';
import MyDrawer from './src/screens/main/MyDrawer.Screen';
import CheckoutReceipt from './src/screens/main/CheckoutReceipt.Screen';
import Blank from './src/screens/auth/Blank.Screen';

import { restoreTokenAction } from './src/redux/auth/auth.actions';

const Stack = createStackNavigator();

class App extends PureComponent {
  componentDidMount() {
    AsyncStorage.getItem('userToken')
      .then(userToken => {
        if (userToken) {
          axios.defaults.headers.common.Authorization = userToken;
          this.props.restoreTokenAction(userToken);
        } else {
          this.props.restoreTokenAction(null);
        }
      })
      .catch(e => {
        console.error('fetching of userToken failed: ', e);
      });
  }

  Content = () => {
    const { userToken, tokenLoading } = this.props;

    if (tokenLoading) {
      return <Stack.Screen name="Blank" component={Blank} />;
    }

    if (!userToken) {
      return (
        <>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              gestureEnabled: true,
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              gestureEnabled: true,
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
            }}
          />
        </>
      );
    }

    return (
      <>
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="CheckoutReceipt" component={CheckoutReceipt} />
      </>
    );
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {this.Content()}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  tokenLoading: auth.tokenLoading,
  userToken: auth.userToken,
});

App.propTypes = {
  userToken: PropTypes.string,
  tokenLoading: PropTypes.bool.isRequired,
  restoreTokenAction: PropTypes.func.isRequired,
};

App.defaultProps = {
  userToken: '',
};

export default connect(mapStateToProps, { restoreTokenAction })(App);
