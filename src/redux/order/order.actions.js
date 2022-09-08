import OrderTypes from './order.types';

export const addItemAct = () => ({
  type: OrderTypes.ADD_ITEM,
});

export const removeItemAct = () => ({
  type: OrderTypes.REMOVE_ITEM,
});

export const resetItemsAct = () => ({
  type: OrderTypes.RESET_ITEMS,
});
