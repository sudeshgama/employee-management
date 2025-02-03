import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  @Input({ required: true }) employeesList!: Employee[];

  @Input({ required: true }) isAdmin!: boolean;

  @Output() editEmployeeEvent: EventEmitter<string> = new EventEmitter<string>();

  editEmployee(employeeId: string) {
    this.editEmployeeEvent.emit(employeeId);
  }

  deleteEmployee(employeeId: string) {

  }
}
