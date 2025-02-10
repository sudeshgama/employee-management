import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee, EmployeeResponse, UpdateEmployeeResponse, DeleteEmployeeResponse } from '../models/employee.model';
import { environment } from '../../../environments/environment.development';
import { of, throwError } from 'rxjs';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployee: Employee = { id: '1', name: 'John Doe', role: 'Developer' }; // Mock data
  const mockEmployeeResponse: EmployeeResponse = { data: [mockEmployee] };
  const mockUpdateEmployeeResponse: UpdateEmployeeResponse = { data: mockEmployee };
  const mockDeleteEmployeeResponse: DeleteEmployeeResponse = {
    data: {
      id: ''
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched requests are left
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees', () => {
    service.getAllEmployees().subscribe(response => {
      expect(response).toEqual(mockEmployeeResponse);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployeeResponse); // Return mock data
  });

  it('should return empty on error for getAllEmployees', () => {
    service.getAllEmployees().subscribe(response => {
      expect(response).toEqual({ data: [] });
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' }); // Simulate an error
  });

  it('should update employee', () => {
    service.updateEmployee('1', mockEmployee).subscribe(response => {
      expect(response).toEqual(mockUpdateEmployeeResponse);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockEmployee);
    req.flush(mockUpdateEmployeeResponse); // Return mock update response
  });

  it('should handle error for updateEmployee', () => {
    service.updateEmployee('1', mockEmployee).subscribe({
      next: () => { },
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush('Error', { status: 500, statusText: 'Server Error' }); // Simulate an error
  });

  it('should delete employee', () => {
    service.deleteEmployee('1').subscribe(response => {
      expect(response).toEqual(mockDeleteEmployeeResponse);
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockDeleteEmployeeResponse); // Return mock delete response
  });

  it('should handle error for deleteEmployee', () => {
    service.deleteEmployee('1').subscribe({
      next: () => { },
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.api.baseUrl}${environment.api.employees.apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Error', { status: 500, statusText: 'Server Error' }); // Simulate an error
  });
});