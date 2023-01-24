import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import thunk from "redux-thunk";
import userReducer from "../redux/features/userSlice";
import tokenReducer from "../redux/features/tokenSlice";

const reducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
