import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "../../services/task.service";
import { CreateNewTask, CreateNewTaskSuccess, DeleteTask, DeleteTaskFailure, DeleteTaskSuccess, SaveTasks, SaveTasksFailure, SaveTasksSuccess, UpdateTask, UpdateTaskFailure, UpdateTaskSuccess } from "../actions/task.actions";
import { catchError, map, of, switchMap } from "rxjs";
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
  });

  createNewTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(CreateNewTask),
      switchMap((action) => {
        const { task } = action;
        return this.taskService.createNewTask(task).pipe(
          map((response) => {
            return CreateNewTaskSuccess({ task: response.data });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(SaveTasksFailure({ error: error.statusText }))
          })
        )
      })
    )
  });

  updateTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UpdateTask),
      switchMap((data) => {
        const { id, task } = data;
        return this.taskService.updateTask(id, task).pipe(
          map((response) => {
            return UpdateTaskSuccess({ task: response.data })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(UpdateTaskFailure(error))
          })
        )
      })
    )
  });

  deleteTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DeleteTask),
      switchMap((data) => {
        const { id } = data;
        return this.taskService.deleteTask(id).pipe(
          map((response) => {
            return DeleteTaskSuccess({ task: response.data });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(DeleteTaskFailure({ error: error.statusText }))
          })
        )
      })
    )
  })
}