import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TaskResponseData } from '../models/task.model';

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
}
