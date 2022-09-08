import OrderTypes from './order.types';

const initialState = {
  totalOrder: 0,
};

// eslint-disable-next-line default-param-last
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OrderTypes.ADD_ITEM:
      return {
        ...state,
        totalOrder: state.totalOrder + 1,
      };

    case OrderTypes.REMOVE_ITEM:
      return {
        ...state,
        totalOrder: state.totalOrder - 1,
      };

    default:
      return state;
  }
};

export default orderReducer;
