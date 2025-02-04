import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../services/employee.service";
import { deleteEmployee, deleteEmployeeFailure, deleteEmployeeSuccess, saveEmployees, saveEmployeesSuccess, updateEmployee, updateEmployeeFailure, updateEmployeeSuccess } from "../actions/employee.actions";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { EmployeeResponse } from "../../models/employee.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);
  private router$ = inject(Router);

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveEmployees),
      exhaustMap(() => this.employeeService.getAllEmployees()
        .pipe(
          map((employee: EmployeeResponse) => saveEmployeesSuccess({ employees: employee.data })),
          catchError(() => EMPTY)
        )
      )
    )
  })

  updateEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEmployee),
      mergeMap(action => {
        const { id, employee } = action;
        return this.employeeService.updateEmployee(id, employee).pipe(
          map((response) => {
            return updateEmployeeSuccess({ employee: response.data });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(updateEmployeeFailure({ error: error.statusText }))
          })
        );
      })
    )
  });

  updateEmployeeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEmployeeSuccess),
      tap(() => {
        this.router$.navigate(['/employees']);
      })
    )
  }, {
    dispatch: false
  });

  deleteEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap(action => {
        const { id } = action;
        return this.employeeService.deleteEmployee(id).pipe(
          map((response) => {
            return deleteEmployeeSuccess({ id: response.data.id })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(deleteEmployeeFailure(error))
          })
        )
      })
    )
  })
}