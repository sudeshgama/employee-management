import { createFeature, createReducer, on } from "@ngrx/store";
import { saveEmployees, saveEmployeesSuccess, saveEmployeesFailure } from "../actions/employee.actions";
import { Employee } from "../../models/employee.model";

export const FeatureKey = 'employee';

export interface State {
  employees: Employee[],
  loading: boolean;
}

export const initialState: State = {
  employees: [],
  loading: false,
}

const reducer = createReducer(
  initialState,
  on(saveEmployees, (state, { employees }) => (
    {
      ...state,
      employees: employees,
      loading: true
    }
  )),

  on(saveEmployeesSuccess, state => (
    {
      ...state,
      loading: false
    }
  )),

  on(saveEmployeesFailure, state => (
    {
      ...state,
      loading: false
    }
  ))
)

export const employeeFeature = createFeature({
  name: FeatureKey,
  reducer
})

export const {
  name,
  selectEmployees,
  selectEmployeeState,
  selectLoading
} = employeeFeature;