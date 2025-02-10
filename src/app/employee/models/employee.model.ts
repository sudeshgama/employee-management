export interface Employee {
  id?: string;
  name?: string;
  position?: string;
  department?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface EmployeeResponse {
  data: Employee[];
}

export interface UpdateEmployeeResponse {
  data: Employee;
}

export interface DeleteEmployeeResponse {
  data: {
    id: string
  };
}