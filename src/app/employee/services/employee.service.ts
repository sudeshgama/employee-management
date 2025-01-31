import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpClient = inject(HttpClient);

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:3000/employees').pipe(
      retry(2),
      catchError(() => EMPTY)
    )
  }
}
