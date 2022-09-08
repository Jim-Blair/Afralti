import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RED, TAN, appURL } from '../../utils/constants';

import globalStyles from '../../utils/globalStyles';

import Back from '../../components/Shared/Back.Component';

import { signInAction } from '../../redux/auth/auth.actions';

const { authHeader, label, input, errorBorder, authBtnTxt } = globalStyles;

const styles = StyleSheet.create({
  cont: {
    height: '100%',
    paddingHorizontal: 20,
  },
});

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      pwd: '',
      errors: {},
      signinFailed: false,
    };
  }

  onChangeUID = userid => this.setState({ userid });

  onChangePwd = pwd => this.setState({ pwd });

  onSubmit = async () => {
    this.setState({ signinFailed: false, errors: {} });

    const { userid, pwd } = this.state;

    if (!userid) {
      this.setState({ errors: { userid: 'Please enter your User ID' } });
      return;
    }

    if (!pwd) {
      this.setState({ errors: { pwd: 'Please enter a new password' } });
      return;
    }

    try {
      const res = await axios.post(`${appURL}login`, { userid, pwd });
      const { token, username } = res.data;

      const theToken = ['userToken', token];
      const myusername = ['username', username];
      const myuserid = ['userid', userid];

      await AsyncStorage.multiSet([theToken, myusername, myuserid]);

      axios.defaults.headers.common.Authorization = theToken;
      this.props.signInAction(token);
    } catch (e) {
      console.error('sign in error: ', e);
      this.setState({ signinFailed: true });
    }
  };

  render() {
    const { userid, pwd, signinFailed, errors } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: TAN }}>
        <ScrollView style={{ height: '100%' }}>
          <Back title="Back" onPress={() => this.props.navigation.pop()} />

          <View style={styles.cont}>
            <Text style={authHeader}>Sign In</Text>

            <Text style={label}>User ID</Text>
            <TextInput
              value={userid}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.pwdRef.focus()}
              returnKeyType="next"
              style={[
                input,
                signinFailed && errorBorder,
                errors.userid && errorBorder,
              ]}
              onChangeText={this.onChangeUID}
            />
            {signinFailed && (
              <Text style={{ color: RED, fontSize: 11 }}>
                Invalid email or password
              </Text>
            )}
            {errors.userid && (
              <Text style={{ color: RED, fontSize: 11 }}>{errors.userid}</Text>
            )}

            <Text style={label}>Password</Text>
            <TextInput
              value={pwd}
              // eslint-disable-next-line no-return-assign
              ref={pinput => (this.pwdRef = pinput)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={input}
              onChangeText={this.onChangePwd}
            />
            {errors.pwd && (
              <Text style={{ color: RED, fontSize: 11 }}>{errors.pwd}</Text>
            )}

            <TouchableOpacity
              style={globalStyles.authGreenBtn}
              onPress={this.onSubmit}>
              <Text style={authBtnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  signInAction: PropTypes.func.isRequired,
};

export default connect(null, { signInAction })(SignIn);
