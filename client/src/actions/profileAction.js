import {
  GET_PROFILES,
  ADD_PROFILE,
  DELETE_PROFILE,
  PROFILES_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getProfiles = () => dispatch => {
  dispatch(setProfilesLoading());
  axios
    .get("/api/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addProfile = profile => (dispatch, getState) => {
  var formData = new FormData();

  formData.append("name", profile.name);
  formData.append("description", profile.description);
  formData.append("number", profile.number);
  formData.append("image", profile.image);
  axios
    .post("/api/profiles", formData, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteProfile = id => (dispatch, getState) => {
  axios
    .delete(`/api/profiles/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_PROFILE, payload: id }));
};

export const setProfilesLoading = () => {
  return { type: PROFILES_LOADING };
};
