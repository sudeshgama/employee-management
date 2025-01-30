import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { StoreModule } from '@ngrx/store';
import { employeeFeature } from './store/reducer/employee.reducer';
import { EmployeeContainerComponent } from './containers/employee-container/employee-container.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeContainerComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    StoreModule.forFeature(employeeFeature)
  ]
})
export class EmployeeModule { }
