import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const saveEmployees = createAction('[Employees] Get All Employees');

export const saveEmployeesSuccess = createAction(
  '[Employees] Get All Employees Success',
  props<{ employees: Employee[] }>()
);

export const saveEmployeesFailure = createAction('[Employees] Get All Employees Failure');

export const updateEmployee = createAction(
  '[Employees Update employee]',
  props<{ id: string, employee: Employee }>()
)

export const updateEmployeeSuccess = createAction(
  '[Employees] Update Employee Success',
  props<{ employee: Employee }>()
);

export const updateEmployeeFailure = createAction(
  '[Employees] Update Employee Failure',
  props<{ error: string }>()
);

export const deleteEmployee = createAction(
  '[Employees Delete employee]',
  props<{ id: string }>()
)

export const deleteEmployeeSuccess = createAction(
  '[Employees] Delete Employee Success',
  props<{ id: string }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employees] Update Employee Failure',
  props<{ error: string }>()
);