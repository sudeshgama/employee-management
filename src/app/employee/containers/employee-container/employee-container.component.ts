import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { employeeFeature, EmployeeState } from '../../store/reducer/employee.reducer';
import { Employee } from '../../models/employee.model';
import { Observable, of } from 'rxjs';
import { saveEmployees } from '../../store/actions/employee.actions';
import { authFeature } from '../../../auth/store/reducer/auth.reducer';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss'
})
export class EmployeeContainerComponent implements OnInit {
  store = inject(Store<EmployeeState>);

  employees$!: Observable<Employee[]>;
  isAdmin$!: Observable<boolean>;


  ngOnInit(): void {
    this.store.dispatch(() => saveEmployees());
    this.employees$ = this.store.select(employeeFeature.selectAll);
    this.isAdmin$ = this.store.select(authFeature.selectIsAdmin);
  }
}
