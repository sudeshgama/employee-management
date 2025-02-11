import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { CreateNewTaskSuccess, DeleteTaskSuccess, SaveTasks, SaveTasksFailure, SaveTasksSuccess, UpdateTask, UpdateTaskSuccess } from "../actions/task.actions";
import { Task } from "../../models/task.model";

export enum TaskStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export const FeatureKey = 'task';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: ''
});

const reducer = createReducer(
  initialState,
  on(SaveTasks, state => ({
    ...state,
    loading: true
  })),
  on(SaveTasksSuccess, (state, { tasks }) => (
    adapter.setAll(tasks, { ...state, loading: false })
  )),
  on(CreateNewTaskSuccess, (state, { task }) => (
    adapter.setOne(task, { ...state, loading: false })
  )),
  on(SaveTasksFailure, (state, { error }) => (
    {
      ...state,
      error,
      loading: false
    }
  )),

  on(UpdateTaskSuccess, (state, { task }) => (
    adapter.setOne(task, { ...state, loading: false })
  )),

  on(DeleteTaskSuccess, (state, { task }) => {
    return adapter.removeOne(task.id!, { ...state, loading: false })
  }
  )
)

export const taskFeature = createFeature({
  name: FeatureKey,
  reducer,
  extraSelectors: ({ selectTaskState }) => ({
    ...adapter.getSelectors(selectTaskState),
    selectInProgressTasks: createSelector(
      selectTaskState,
      (state: TaskState) => {
        const allTasks = adapter.getSelectors().selectAll(state);
        return allTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
      }
    ),
    selectNewTasks: createSelector(
      selectTaskState,
      (state: TaskState) => {
        const allTasks = adapter.getSelectors().selectAll(state);
        return allTasks.filter(task => task.status === TaskStatus.NEW)
      }
    ),
    selectCompletedTasks: createSelector(
      selectTaskState,
      (state: TaskState) => {
        const allTasks = adapter.getSelectors().selectAll(state);
        return allTasks.filter(task => task.status === TaskStatus.DONE)
      }
    )
  })
});

export const {
  name,
  selectLoading,
  selectTaskState,
  selectError,
  selectAll,
  selectInProgressTasks,
  selectNewTasks,
  selectCompletedTasks
} = taskFeature;