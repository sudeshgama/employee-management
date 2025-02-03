import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { saveEmployees, saveEmployeesSuccess, saveEmployeesFailure } from "../actions/employee.actions";
import { Employee } from "../../models/employee.model";
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const FeatureKey = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
}

export const adapter = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
});

const reducer = createReducer(
  initialState,
  on(saveEmployees, state => (
    {
      ...state,
      loading: true
    }
  )),

  on(saveEmployeesSuccess, (state, { employees }) => (
    adapter.setAll(employees, { ...state, loading: false })
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
  reducer,
  extraSelectors: ({ selectEmployeeState }) => ({
    ...adapter.getSelectors(selectEmployeeState)
  })
})

export const {
  name,
  selectEmployeeState,
  selectAll,
  selectLoading
} = employeeFeature;