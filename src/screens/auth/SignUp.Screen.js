/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TAN, RED, appURL } from '../../utils/constants';

import globalStyles from '../../utils/globalStyles';

import Back from '../../components/Shared/Back.Component';

import { signInAction } from '../../redux/auth/auth.actions';

const styles = StyleSheet.create({
  cont: {
    height: '92%',
    paddingHorizontal: 20,
  },
  label: { color: '#404040', fontSize: 20, marginTop: 40, marginBottom: 10 },
  input: {
    backgroundColor: '#FAFAF9',
    borderRadius: 10,
  },
});

const { authHeader, label, input, errorBorder } = globalStyles;

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      defpwd: '',
      username: '',
      pwd: '',
      rptpwd: '',
      signupFailed: false,
      errors: {},
    };
  }

  onChangeUID = userid => this.setState({ userid });

  onChangeDefPwd = defpwd => this.setState({ defpwd });

  onChangeUsername = username => this.setState({ username });

  onChangePwd = pwd => this.setState({ pwd });

  onChangeRptPwd = rptpwd => this.setState({ rptpwd });

  onSubmit = () => {
    this.setState({ signupFailed: false, errors: {} });

    const { userid, defpwd, pwd, rptpwd, username } = this.state;

    if (!userid) {
      this.setState({ errors: { userid: 'Please enter your User ID' } });
      return;
    }

    if (!defpwd) {
      this.setState({
        errors: { defpwd: 'Please enter the default password issued to you' },
      });
      return;
    }

    if (!pwd) {
      this.setState({ errors: { pwd: 'Please enter a new password' } });
      return;
    }

    if (!rptpwd) {
      this.setState({ errors: { rptpwd: 'Please repeat the new password' } });
      return;
    }

    if (rptpwd !== pwd) {
      this.setState({ errors: { rptpwd: 'Passwords must match' } });
      return;
    }

    axios
      .post(`${appURL}cracc`, { username, userid, defpwd, pwd })
      .then(res => {
        const theToken = res.data;
        const token = ['userToken', theToken];
        const myusername = ['username', username];
        const myuserid = ['userid', userid];

        AsyncStorage.multiSet([token, myusername, myuserid]).catch(() => {
          throw new Error('Async Storage save failed');
        });
        axios.defaults.headers.common.Authorization = theToken;
        this.props.signInAction(theToken);
      })
      .catch(e => {
        console.error('sign up error: ', e);
        this.scrollView.scrollTo({ y: 0, animated: true });
        this.setState({ signupFailed: true });
      });
  };

  render() {
    const { userid, defpwd, pwd, rptpwd, username, signupFailed, errors } =
      this.state;

    return (
      <SafeAreaView style={{ backgroundColor: TAN }}>
        <Back title="Back" onPress={() => this.props.navigation.pop()} />

        <ScrollView
          style={styles.cont}
          ref={ref => {
            this.scrollView = ref;
          }}>
          <Text style={authHeader}>Sign Up</Text>

          <Text style={label}>User ID</Text>
          <TextInput
            value={userid}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.unameRef.focus()}
            returnKeyType="next"
            style={[
              input,
              signupFailed && errorBorder,
              errors.userid && errorBorder,
            ]}
            onChangeText={this.onChangeUID}
          />
          {signupFailed && (
            <Text style={{ color: RED, fontSize: 11 }}>
              An error occured, please try again
            </Text>
          )}
          {errors.userid && (
            <Text style={{ color: RED, fontSize: 11 }}>{errors.userid}</Text>
          )}

          <Text style={label}>Preferred Username</Text>
          <TextInput
            value={username}
            ref={unameinput => (this.unameRef = unameinput)}
            returnKeyType="next"
            onSubmitEditing={() => this.defPwdRef.focus()}
            style={[input, errors.username && errorBorder]}
            onChangeText={this.onChangeUsername}
          />
          {errors.username && (
            <Text style={{ color: RED, fontSize: 11 }}>{errors.defpwd}</Text>
          )}

          <Text style={label}>Default Password</Text>
          <TextInput
            value={defpwd}
            ref={dpinput => (this.defPwdRef = dpinput)}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.pwdRef.focus()}
            style={[input, errors.defpwd && errorBorder]}
            onChangeText={this.onChangeDefPwd}
          />
          {errors.defpwd && (
            <Text style={{ color: RED, fontSize: 11 }}>{errors.defpwd}</Text>
          )}

          <Text style={label}>New Password</Text>
          <TextInput
            value={pwd}
            ref={pinput => (this.pwdRef = pinput)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => this.rPwdRef.focus()}
            style={[input, errors.pwd && errorBorder]}
            onChangeText={this.onChangePwd}
          />
          {errors.pwd && (
            <Text style={{ color: RED, fontSize: 11 }}>{errors.pwd}</Text>
          )}

          <Text style={label}>Repeat New Password</Text>
          <TextInput
            value={rptpwd}
            ref={npinput => (this.rPwdRef = npinput)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            style={[input, errors.rptpwd && errorBorder]}
            onChangeText={this.onChangeRptPwd}
          />
          {errors.rptpwd && (
            <Text style={{ color: RED, fontSize: 11 }}>{errors.rptpwd}</Text>
          )}

          <TouchableOpacity
            onPress={this.onSubmit}
            style={[globalStyles.authGreenBtn, { marginBottom: 30 }]}>
            <Text style={globalStyles.authBtnTxt}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
  signInAction: PropTypes.func.isRequired,
};

export default connect(null, { signInAction })(SignUp);
