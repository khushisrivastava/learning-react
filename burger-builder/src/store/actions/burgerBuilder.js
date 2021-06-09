import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name,
});

export const removeIngredient = (name) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name,
});

export const setIngredients = (ingredient) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredient,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENT,
});

export const resetBurgerBuilding = () => ({
  type: actionTypes.RESET_BURGER_BUILDING,
});
