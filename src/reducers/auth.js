export const initialState = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isAuthenticated: true };
    }
    case "LOAD_USER": {
      return { ...state, user: action.user };
    }
    case "LOGOUT": {
      return { isAuthenticated: false, user: null };
    }
    default:
      return state;
  }
}
