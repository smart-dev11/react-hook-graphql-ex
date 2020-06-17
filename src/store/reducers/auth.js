import * as types from "../actions/types";

export const initial_state = {
  isAuthenticated: null,
};

const authReducer = (state = initial_state, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
