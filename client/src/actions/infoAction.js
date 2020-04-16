import {
  GET_INFOS,
  ADD_INFO,
  UPDATE_INFO,
  DELETE_INFO,
  INFOS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getInfos = () => dispatch => {
  dispatch(setInfosLoading());
  axios
    .get("/api/infos")
    .then(res => {
      dispatch({
        type: GET_INFOS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addInfo = info => (dispatch, getState) => {
  axios
    .post("/api/infos", info, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_INFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const updateInfo = (id, info) => (dispatch, getState) => {
  axios
    .put(`/api/infos/${id}`, info, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_INFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteInfo = id => (dispatch, getState) => {
  axios
    .delete(`/api/infos/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_INFO, payload: id }));
};

export const setInfosLoading = () => {
  return { type: INFOS_LOADING };
};
