export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

export interface EmployeeResponse {
  data: Employee[];
}