import { createStore, combineReducers } from "redux";
import reducer from "./reducers";
import { initialState } from "./reducers";

const rootReducer = combineReducers({
  quadObj: reducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("quadObj");

    if (serializedState === null) {
      return { quadObj: initialState };
    }
    return { quadObj: JSON.parse(serializedState) };
  } catch (err) {
    console.warn(err);
    return { quadObj: initialState };
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("quadObj", serializedState);
  } catch (err) {}
};

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState().quadObj);
});

export default store;
