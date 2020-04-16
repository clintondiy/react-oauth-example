import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import infoReducer from "./infoReducer";
import configReducer from "./configReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
  role: roleReducer,
  info: infoReducer,
  config: configReducer
});
