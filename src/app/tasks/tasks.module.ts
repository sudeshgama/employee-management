import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './containers/task/task.component';

import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
