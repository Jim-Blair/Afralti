import React, { PureComponent } from 'react';
import { SafeAreaView, Animated } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GREEN, TAN } from '../../utils/constants';

import { signOutAction } from '../../redux/auth/auth.actions';

class Goodbye extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.introAnim();

    setTimeout(() => {
      this.props.signOutAction();
    }, 1500);
  }

  introAnim = () => {
    const { fadeAnim } = this.state;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { fadeAnim } = this.state;

    return (
      <SafeAreaView
        style={{
          backgroundColor: TAN,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Text
          style={{
            color: GREEN,
            fontWeight: 'bold',
            fontSize: 40,
            opacity: fadeAnim,
          }}>
          Goodbye
        </Animated.Text>
      </SafeAreaView>
    );
  }
}

Goodbye.propTypes = {
  signOutAction: PropTypes.func.isRequired,
};

export default connect(null, { signOutAction })(Goodbye);
