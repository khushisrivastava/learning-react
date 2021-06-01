import * as actionTypes from "./actions";

const initialState = {
  ingredient: {
      cheese: 0,
      bacon: 0,
      meat: 0,
      salad: 0
  },
  price: 4,
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
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICE[action.ingredientName]
            }
        default:
            return state
    }
};

export default reducer;
