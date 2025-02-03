import { createFeature, createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout } from "../actions/auth.actions";

interface State {
  loading: boolean;
  error: string;
  isLoggedIn: boolean;
  token: string;
  isAdmin: boolean;
}

const initialLoginState: State = {
  loading: false,
  error: '',
  isLoggedIn: false,
  token: '',
  isAdmin: false
}

const reducer = createReducer(
  initialLoginState,
  on(login, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loginSuccess, (state, { employee }) => {
    return {
      ...state,
      loading: false,
      isLoggedIn: true,
      token: employee.token,
      isAdmin: employee.role === 'admin',
      error: ''
    }
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false
    }
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: '',
      isAdmin: false,
      isLoggedIn: false
    }
  })
);

export const authFeature = createFeature({
  name: 'auth',
  reducer
});

export const { selectLoading, selectError, selectIsLoggedIn, selectToken, selectIsAdmin } = authFeature;