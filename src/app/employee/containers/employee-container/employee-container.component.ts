import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { employeeFeature, selectEmployees, State } from '../../store/reducer/employee.reducer';
import { Employee } from '../../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss'
})
export class EmployeeContainerComponent implements OnInit {
  store = inject(Store<State>);

  employees$!: Observable<Employee[]>;

  ngOnInit(): void {
    this.employees$ = this.store.select(employeeFeature.selectEmployees);
  }
}
