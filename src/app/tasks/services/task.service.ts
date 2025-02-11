import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateTaskResponseData, Task, TaskResponseData, UpdateTaskResponseData } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private httpClient = inject(HttpClient);
  private endPointUrl = `${environment.api.baseUrl}${environment.api.tasks.apiUrl}`;

  getAllTasks(): Observable<TaskResponseData> {
    return this.httpClient.get<TaskResponseData>(`${this.endPointUrl}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

  createNewTask(task: Task): Observable<CreateTaskResponseData> {
    return this.httpClient.post<CreateTaskResponseData>(`${this.endPointUrl}`, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }

  updateTask(id: string, task: Task): Observable<UpdateTaskResponseData> {
    return this.httpClient.put<UpdateTaskResponseData>(`${this.endPointUrl}/${id}`, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }
}
