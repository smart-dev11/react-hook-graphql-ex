export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const initial_state = {
  isAuthenticated: null,
};

const authReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
