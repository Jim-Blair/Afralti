import React, { PureComponent } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import PropTypes from 'prop-types';

import landingImg from '../images/landing.jpg';

import { TAN, BLACK } from '../utils/constants';

import LandingBtn from '../components/auth/LandingBtn.Component';

const styles = StyleSheet.create({
  cont: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  txt: {
    backgroundColor: TAN,
    color: BLACK,
    fontSize: 30,
    padding: 8,
    fontWeight: 'bold',
    marginBottom: 3,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
});

class Landing extends PureComponent {
  toSignUp = () => {
    this.props.navigation.push('SignUp');
  };

  toSignIn = () => {
    this.props.navigation.push('SignIn');
  };

  render() {
    return (
      <SafeAreaView>
        <ImageBackground source={landingImg} style={styles.cont}>
          <View>
            <Text style={styles.txt}>WELCOME TO</Text>
            <Text style={styles.txt}>AFRALTI MEALS</Text>
          </View>

          <View>
            <LandingBtn title="Sign Up" navigateTo={this.toSignUp} />
            <LandingBtn title="Sign In" signin navigateTo={this.toSignIn} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Landing;
