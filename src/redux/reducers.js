import {
  RESET,
  SET_CURRENT_HIGHEST_SCORE,
  SET_INPUT_LOCKED,
  UPDATE_COUNTER,
  UPDATE_CURRENT_COLOR_LIST,
  UPDATE_CURRENT_COUNTER,
  UPDATE_QUAD_FLASH,
} from "./action-types";

export const initialState = {
  flashQuad1: "",
  flashQuad2: "",
  flashQuad3: "",
  flashQuad4: "",
  currentColorList: [],
  counter: 0,
  currentCounter: 0,
  currentHighestScore: 0,
  inputLocked: false,
};

const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case UPDATE_COUNTER:
      newState = { ...state, counter: action.payload };
      break;

    case UPDATE_CURRENT_COLOR_LIST:
      newState = {
        ...state,
        currentColorList: [...state.currentColorList, action.payload],
      };
      break;

    case UPDATE_QUAD_FLASH:
      newState = {
        ...state,
        ...action.payload,
      };
      break;

    case UPDATE_CURRENT_COUNTER:
      newState = { ...state, currentCounter: action.payload };
      break;

    case RESET:
      newState = {
        ...initialState,
        currentHighestScore: state.currentHighestScore,
      };
      break;

    case SET_CURRENT_HIGHEST_SCORE:
      if (state.currentHighestScore < action.payload) {
        newState = { ...state, currentHighestScore: action.payload };
      }
      break;

    case SET_INPUT_LOCKED:
      newState = { ...state, inputLocked: action.payload };
      break;

    default:
      break;
  }
  return newState;
};

export default reducer;
