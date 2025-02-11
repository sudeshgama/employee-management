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
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TaskComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    TasksRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    StoreModule.forFeature(taskFeature),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TasksModule { }
