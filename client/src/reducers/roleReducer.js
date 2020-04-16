import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  ROLES_LOADING
} from "../actions/types";

const initalState = {
  roles: [],
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        loading: false
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter(role => role._id !== action.payload)
      };
    case ADD_ROLE:
      return {
        ...state,
        roles: [action.payload, ...state.roles]
      };
    case ROLES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
