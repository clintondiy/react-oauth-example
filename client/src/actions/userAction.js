import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addUser = user => (dispatch, getState) => {
  axios
    .post("/api/users", user, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/api/users/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_USER, payload: id }));
};

export const setUsersLoading = () => {
  return { type: USERS_LOADING };
};
