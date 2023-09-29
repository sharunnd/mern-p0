import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as signupReducer } from "./signupReducer/reducer";
import { reducer as loginReducer } from "./loginReducer/reducer";
import { reducer as todoReducer } from "./todoReducer/reducer";
import { reducer as addTodoReducer } from "./AddTodoReducer/reducer";
const rootReducer = combineReducers({
signupReducer,
loginReducer,
todoReducer,
addTodoReducer
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);