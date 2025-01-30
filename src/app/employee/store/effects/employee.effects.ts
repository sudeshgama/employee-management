import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../services/employee.service";
import { saveEmployees, saveEmployeesSuccess } from "../actions/employee.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveEmployees),
      exhaustMap(() => this.employeeService.getAllEmployees()
        .pipe(
          map(employee => saveEmployeesSuccess({ employees: employee })),
          catchError(() => EMPTY)
        )
      )
    )
  })
}