import { createFeature, createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout } from "../actions/auth.actions";

interface State {
  employee: {
    token: string;
    email: string;
    role: string;
  },
  loading: boolean;
  error: string;
  isLoggedIn: boolean;
}

const initialLoginState: State = {
  employee: {
    token: '',
    email: '',
    role: '',
  },
  loading: false,
  error: '',
  isLoggedIn: false
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
      employee,
      loading: false,
      isLoggedIn: true
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
      employee: {
        email: '',
        token: '',
        role: ''
      },
      isLoggedIn: false
    }
  })
);

export const authFeature = createFeature({
  name: 'auth',
  reducer
});

export const { selectEmployee, selectLoading, selectError, selectIsLoggedIn } = authFeature;