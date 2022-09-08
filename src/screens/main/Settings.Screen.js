import React, { PureComponent } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Feather';

import { BLACK } from '../../utils/constants';
import globalStyles from '../../utils/globalStyles';

const styles = StyleSheet.create({
  menuIcon: {
    paddingTop: 1,
    paddingRight: 10,
    paddingLeft: 12,
  },
  greeting: { fontSize: 24, lineHeight: 24, color: BLACK },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B4B4B4',
    paddingLeft: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnTxt: { fontSize: 18, marginLeft: 10 },
});

// TODO: delete this screen if its never used

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={globalStyles.screen}>
        <View style={{ flexDirection: 'row' }}>
          <Icons
            name="menu"
            color={BLACK}
            size={17}
            onPress={this.props.navigation.openDrawer}
            style={styles.menuIcon}
          />

          <Text style={styles.greeting}>Settings</Text>
        </View>

        <View style={{ marginHorizontal: 18, marginTop: 40 }}>
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => this.setState({showModal: true})}
          >
            <Icons name="user-x" color="#F87171" size={28} />
            <Text style={styles.btnTxt}>Delete Account</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />

          <TouchableOpacity style={styles.btn} onPress={this.signOut}>
            <Icons name="log-out" size={28} />
            <Text style={styles.btnTxt}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
