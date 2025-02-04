import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { employeeFeature, EmployeeState, selectEmployeeById } from '../../store/reducer/employee.reducer';
import { Employee } from '../../models/employee.model';
import { Observable, of } from 'rxjs';
import { deleteEmployee, saveEmployees } from '../../store/actions/employee.actions';
import { authFeature } from '../../../auth/store/reducer/auth.reducer';
import { Router } from '@angular/router';
import { DeleteEmployeeComponent } from '../../components/delete-employee/delete-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrl: './employee-container.component.scss'
})
export class EmployeeContainerComponent implements OnInit {
  private store$ = inject(Store<EmployeeState>);
  private router = inject(Router);
  private dialog = inject(MatDialog);


  employees$!: Observable<Employee[]>;
  isAdmin$!: Observable<boolean>;


  ngOnInit(): void {
    this.store$.dispatch(() => saveEmployees());
    this.employees$ = this.store$.select(employeeFeature.selectAll);
    this.isAdmin$ = this.store$.select(authFeature.selectIsAdmin);
  }

  editEmployee(employeeId: string) {
    this.router.navigate([`employees/edit/${employeeId}`]);
  }

  deleteEmployee(employeeId: string) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '300px',
      data: { employeeId }, // Optional: Pass data to the modal
    });

    // perform delete action
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store$.dispatch(() => deleteEmployee({ id: employeeId }))
      }
    })
  }
}
