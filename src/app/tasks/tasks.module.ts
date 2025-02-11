import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './containers/task/task.component';

import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { taskFeature } from './store/reducer/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    TasksRoutingModule,
    StoreModule.forFeature(taskFeature),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TasksModule { }
