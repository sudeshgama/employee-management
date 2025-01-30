import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  @Input({ required: true }) employeesList!: Employee[];
  ngOnInit(): void {
    console.log(this.employeesList);
  }
}
