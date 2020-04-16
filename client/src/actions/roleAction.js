import { GET_ROLES, ADD_ROLE, DELETE_ROLE, ROLES_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getRoles = () => dispatch => {
  dispatch(setRolesLoading());
  axios
    .get("/api/roles")
    .then(res =>
      dispatch({
        type: GET_ROLES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addRole = role => (dispatch, getState) => {
  axios
    .post("/api/roles", role, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ROLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteRole = id => (dispatch, getState) => {
  axios
    .delete(`/api/roles/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_ROLE, payload: id }));
};

export const setRolesLoading = () => {
  return { type: ROLES_LOADING };
};
