import AuthTypes from './auth.types';

export const restoreTokenAction = receivedToken => ({
  type: AuthTypes.RESTORE_TOKEN,
  payload: receivedToken,
});

export const signInAction = userToken => ({
  type: AuthTypes.SIGN_IN,
  payload: userToken,
});

export const signOutAction = () => ({
  type: AuthTypes.SIGN_OUT,
});
