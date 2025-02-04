import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry, throwError } from 'rxjs';
import { DeleteEmployeeResponse, Employee, EmployeeResponse, UpdateEmployeeResponse } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpClient = inject(HttpClient);
  private endPointUrl = `${environment.api.baseUrl}${environment.api.employees.apiUrl}`;

  getAllEmployees(): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(this.endPointUrl).pipe(
      catchError(() => EMPTY)
    )
  }

  updateEmployee(id: string, employee: Employee): Observable<UpdateEmployeeResponse> {
    return this.httpClient.put<UpdateEmployeeResponse>(`${this.endPointUrl}/${id}`, employee).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  deleteEmployee(id: string): Observable<DeleteEmployeeResponse> {
    return this.httpClient.delete<DeleteEmployeeResponse>(`${this.endPointUrl}/${id}`);
  }
}
