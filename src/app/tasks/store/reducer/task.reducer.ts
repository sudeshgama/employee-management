import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { SaveTasks, SaveTasksFailure, SaveTasksSuccess } from "../actions/task.actions";
import { Task } from "../../models/task.model";

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
  on(SaveTasksFailure, (state, { error }) => (
    {
      ...state,
      error,
      loading: false
    }
  ))
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
        return allTasks.filter(task => task.status === 'in-progress')
      }
    ),
    selectNewTasks: createSelector(
      selectTaskState,
      (state: TaskState) => {
        const allTasks = adapter.getSelectors().selectAll(state);
        return allTasks.filter(task => task.status === 'in-progress')
      }
    ),
    selectCompletedTasks: createSelector(
      selectTaskState,
      (state: TaskState) => {
        const allTasks = adapter.getSelectors().selectAll(state);
        return allTasks.filter(task => task.status === 'in-progress')
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