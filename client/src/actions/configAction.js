import {
  GET_CONFIGS,
  ADD_CONFIG,
  DELETE_CONFIG,
  UPDATE_CONFIG,
  CONFIGS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getConfigs = () => dispatch => {
  dispatch(setConfigsLoading());
  axios
    .get("/api/configs")
    .then(res =>
      dispatch({
        type: GET_CONFIGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addConfig = config => (dispatch, getState) => {
  axios
    .post("/api/configs", config, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_CONFIG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateConfig = (id, config) => (dispatch, getState) => {
  axios
    .put(`/api/configs/${id}`, config, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_CONFIG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteConfig = id => (dispatch, getState) => {
  axios
    .delete(`/api/configs/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_CONFIG, payload: id }));
};

export const setConfigsLoading = () => {
  return { type: CONFIGS_LOADING };
};
