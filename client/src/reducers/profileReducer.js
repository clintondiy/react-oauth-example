import {
  GET_PROFILES,
  ADD_PROFILE,
  DELETE_PROFILE,
  PROFILES_LOADING
} from "../actions/types";
const initalState = {
  profiles: [],
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          profile => profile._id !== action.payload
        )
      };
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [action.payload, ...state.profiles]
      };
    case PROFILES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
