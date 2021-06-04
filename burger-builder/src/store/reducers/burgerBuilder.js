import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredient: null,
  price: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICE = {
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.5,
  salad: 0.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] + 1,
        },
        price: state.price + INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredient: action.ingredients,
        error: false,
        price: 4,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.RESET_BURGER_BUILDING:
      return {
        ...state,
        building: false,
      };
    default:
      return state;
  }
};

export default reducer;
