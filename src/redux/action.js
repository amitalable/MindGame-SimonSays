import {
  RESET,
  SET_CURRENT_HIGHEST_SCORE,
  SET_INPUT_LOCKED,
  UPDATE_COUNTER,
  UPDATE_CURRENT_COLOR_LIST,
  UPDATE_CURRENT_COUNTER,
  UPDATE_QUAD_FLASH,
} from "./action-types";

export const updateQuadFlash = (obj) => ({
  type: UPDATE_QUAD_FLASH,
  payload: obj,
});

export const updateCurrentColorList = (color) => ({
  type: UPDATE_CURRENT_COLOR_LIST,
  payload: color,
});

export const updateCounter = (counter) => ({
  type: UPDATE_COUNTER,
  payload: counter,
});

export const updateCurrentCounter = (counter) => ({
  type: UPDATE_CURRENT_COUNTER,
  payload: counter,
});

export const reset = () => ({
  type: RESET,
});

export const setCurrentHighestScore = (score) => ({
  type: SET_CURRENT_HIGHEST_SCORE,
  payload: score,
});

export const setInputLocked = (lock) => ({
  type: SET_INPUT_LOCKED,
  payload: lock,
});
