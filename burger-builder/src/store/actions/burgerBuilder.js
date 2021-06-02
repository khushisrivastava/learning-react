import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

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

export const initIngredients = () => (dispatch) => {
  axios
    .get("/ingredient.json")
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailed());
    });
};
