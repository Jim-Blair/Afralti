import AuthTypes from './auth.types';

const initialState = {
  tokenLoading: true,
  userToken: null,
};

// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.RESTORE_TOKEN:
      return {
        ...state,
        tokenLoading: false,
        userToken: action.payload,
      };

    case AuthTypes.SIGN_IN:
      return {
        ...state,
        userToken: action.payload,
      };

    case AuthTypes.SIGN_OUT:
      return {
        ...state,
        userToken: null,
      };

    default:
      return state;
  }
};

export default authReducer;
