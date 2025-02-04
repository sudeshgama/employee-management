import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { saveEmployees, saveEmployeesSuccess, saveEmployeesFailure, updateEmployeeSuccess, updateEmployee, updateEmployeeFailure, deleteEmployeeSuccess, deleteEmployee, deleteEmployeeFailure } from "../actions/employee.actions";
import { Employee } from "../../models/employee.model";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { state } from "@angular/animations";

export const FeatureKey = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  error: ''
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
  )),

  on(updateEmployee, state => ({
    ...state,
    loading: true
  })),

  on(updateEmployeeSuccess, (state, { employee }) => (
    adapter.setOne(employee, { ...state, loading: false })
  )),

  on(updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(deleteEmployee, (state) => ({
    ...state,
    loading: true
  })),

  on(deleteEmployeeSuccess, (state, { id }) => (
    adapter.removeOne(id, { ...state, loading: false })
  )),

  on(deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: true,
    error
  })),

)

export const employeeFeature = createFeature({
  name: FeatureKey,
  reducer,
  extraSelectors: ({ selectEmployeeState, selectEntities }) => ({
    ...adapter.getSelectors(selectEmployeeState),
    selectEmployeeById: (id: string) => createSelector(
      selectEntities,
      (entities) => entities[id]!
    )
  })
})

export const {
  name,
  selectEmployeeState,
  selectAll,
  selectLoading,
  selectEmployeeById
} = employeeFeature;