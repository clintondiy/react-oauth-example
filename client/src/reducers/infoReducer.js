import { GET_INFOS, INFOS_LOADING, UPDATE_INFO } from "../actions/types";
import _ from "lodash";
const initalState = {
  infos: [],
  loading: false
};

const update = (arr, key, newval) => {
  var match = _.find(arr, key);
  if (match) _.merge(match, newval);
  else arr.push(newval);
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_INFOS:
      return {
        ...state,
        infos: action.payload,
        loading: false
      };
    case UPDATE_INFO:
      update(state.infos, { _id: action.payload._id }, action.payload);

      return {
        ...state,
        infos: state.infos
      };
    case INFOS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
