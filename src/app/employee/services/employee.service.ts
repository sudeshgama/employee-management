import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import { Employee, EmployeeResponse, UpdateEmployeeResponse } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpClient = inject(HttpClient);

  getAllEmployees(): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>('http://localhost:3001/api/employees').pipe(
      catchError(() => EMPTY)
    )
  }

  updateEmployee(id: string, employee: Employee): Observable<UpdateEmployeeResponse> {
    return this.httpClient.put<UpdateEmployeeResponse>(`http://localhost:3001/api/employees/${id}`, employee);
  }
}
