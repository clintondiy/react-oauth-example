import {
  GET_CONFIGS,
  ADD_CONFIG,
  UPDATE_CONFIG,
  DELETE_CONFIG,
  CONFIGS_LOADING
} from "../actions/types";
import _ from "lodash";

const initalState = {
  configs: [],
  loading: false
};

const update = (arr, key, newval) => {
  var match = _.find(arr, key);
  if (match) _.merge(match, newval);
  else arr.push(newval);
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_CONFIGS:
      return {
        ...state,
        configs: action.payload,
        loading: false
      };
    case DELETE_CONFIG:
      return {
        ...state,
        configs: state.configs.filter(config => config._id !== action.payload)
      };
    case ADD_CONFIG:
      return {
        ...state,
        configs: [action.payload, ...state.configs]
      };
    case UPDATE_CONFIG:
      update(state.configs, { _id: action.payload._id }, action.payload);

      return {
        ...state,
        configs: state.configs
      };
    case CONFIGS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
