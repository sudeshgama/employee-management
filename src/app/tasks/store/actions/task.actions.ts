import { createAction, props } from "@ngrx/store";
import { Task } from "../../models/task.model";

export const SaveTasks = createAction(
  '[Tasks] Save Tasks',
);

export const SaveTasksSuccess = createAction(
  '[Tasks] Save Tasks Success',
  props<{ tasks: Task[] }>()
);

export const SaveTasksFailure = createAction(
  '[Tasks] Save Tasks Failure',
  props<{ error: string }>()
);

export const CreateNewTask = createAction(
  '[Tasks] Create New Task',
  props<{ task: Task }>()
)

export const CreateNewTaskSuccess = createAction(
  '[Tasks] Create New Task Success',
  props<{ task: Task }>()
)

export const CreateNewTaskFailure = createAction(
  '[Tasks] Create New Task Failure',
  props<{ error: string }>()
)