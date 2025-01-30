import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const saveEmployees = createAction('[Employees] Get All Employees');
export const saveEmployeesSuccess = createAction(
  '[Employees] Get All Employees Success',
  props<{ employees: Employee[] }>()
);
export const saveEmployeesFailure = createAction('[Employees] Get All Employees Failure');

