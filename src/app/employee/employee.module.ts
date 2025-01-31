import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { StoreModule } from '@ngrx/store';
import { employeeFeature } from './store/reducer/employee.reducer';
import { EmployeeContainerComponent } from './containers/employee-container/employee-container.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeContainerComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    StoreModule.forFeature(employeeFeature),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeeModule { }
