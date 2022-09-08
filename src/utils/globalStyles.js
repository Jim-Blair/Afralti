import { StyleSheet } from 'react-native';

import { BLACK, GREEN, TAN, LIGHT_TAN, RED } from './constants';

const globalStyles = StyleSheet.create({
  backTxt: {
    fontSize: 21,
    color: BLACK,
  },
  authHeader: {
    marginTop: 60,
    marginBottom: 10,
    fontSize: 34,
    color: BLACK,
    fontWeight: 'bold',
  },
  label: { color: '#404040', fontSize: 20, marginTop: 40, marginBottom: 10 },
  input: {
    backgroundColor: LIGHT_TAN,
    borderRadius: 10,
  },
  errorBorder: {
    borderColor: RED,
    borderWidth: 1,
    marginBottom: 5,
  },
  authGreenBtn: {
    backgroundColor: GREEN,
    alignSelf: 'flex-end',
    marginTop: 35,
    borderRadius: 7,
  },
  authBtnTxt: {
    color: TAN,
    fontSize: 23,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  screen: {
    backgroundColor: TAN,
    height: '100%',
    paddingTop: 10,
  },
});

export default globalStyles;
