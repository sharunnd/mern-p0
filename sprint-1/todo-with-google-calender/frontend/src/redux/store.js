import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as signupReducer } from "./signupReducer/reducer";
const rootReducer = combineReducers({
signupReducer
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);