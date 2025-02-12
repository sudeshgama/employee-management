export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskResponseData {
  data: Task[];
}

export interface CreateTaskResponseData {
  data: Task;
  message?: string;
}

export interface UpdateTaskResponseData {
  data: Task;
  message?: string;
}