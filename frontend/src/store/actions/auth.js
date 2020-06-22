import * as types from "./types";

export const loginSuccess = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});

export const registerSuccess = (data) => ({
  type: types.REGISTER_SUCCESS,
  payload: data,
});
