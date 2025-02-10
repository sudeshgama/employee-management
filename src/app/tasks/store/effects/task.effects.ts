import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "../../services/task.service";
import { SaveTasks, SaveTasksFailure, SaveTasksSuccess } from "../actions/task.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class TaskEffects {
  private action$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SaveTasks),
      switchMap(() => {
        return this.taskService.getAllTasks().pipe(
          map((response) => {
            return SaveTasksSuccess({ tasks: response.data })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(SaveTasksFailure({ error: error.statusText }))
          })
        )
      })
    )
  })
}