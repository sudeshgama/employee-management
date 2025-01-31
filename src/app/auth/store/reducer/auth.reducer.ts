import { createFeature, createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess } from "../actions/auth.actions";

interface State {
  employee: {
    token: string;
    email: string;
    role: string;
  },
  loading: boolean;
  error: string;
}

const initialLoginState: State = {
  employee: {
    token: '',
    email: '',
    role: '',
  },
  loading: false,
  error: ''
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
      loading: false
    }
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false
    }
  })
);

export const authFeature = createFeature({
  name: 'auth',
  reducer
});

export const { selectEmployee, selectLoading, selectError } = authFeature;