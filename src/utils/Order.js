/* eslint-disable import/no-mutable-exports */
let breakfastOrder = [];
let lunchOrder = [];

const addMealItem = ({ id, mealName, kind }) => {
  if (kind === 'brkfst') {
    const idx = breakfastOrder.findIndex(m => m.id === id);

    if (idx === -1) {
      breakfastOrder.push({ id, mealName, quantity: 1 });
    } else {
      const meal = breakfastOrder[idx];
      const currentQuantity = meal.quantity;
      meal.quantity = currentQuantity + 1;
    }
  } else {
    const idx = lunchOrder.findIndex(m => m.id === id);

    if (idx === -1) {
      lunchOrder.push({ id, mealName, quantity: 1 });
    } else {
      const meal = lunchOrder[idx];
      const currentQuantity = meal.quantity;
      meal.quantity = currentQuantity + 1;
    }
  }
};

const minusMealItem = ({ id, kind }) => {
  if (kind === 'brkfst') {
    const idx = breakfastOrder.findIndex(m => m.id === id);

    if (idx !== -1) {
      const meal = breakfastOrder[idx];
      const currentQuantity = meal.quantity;

      if (currentQuantity === 1) {
        breakfastOrder.splice(idx, 1);
      } else {
        meal.quantity = currentQuantity - 1;
      }
    }
  } else {
    const idx = lunchOrder.findIndex(m => m.id === id);

    if (idx !== -1) {
      const meal = lunchOrder[idx];
      const currentQuantity = meal.quantity;

      if (currentQuantity === 1) {
        lunchOrder.splice(idx, 1);
      } else {
        meal.quantity = currentQuantity - 1;
      }
    }
  }
};

const resetOrder = () => {
  breakfastOrder = [];
  lunchOrder = [];
};

export { breakfastOrder, lunchOrder, addMealItem, minusMealItem, resetOrder };
