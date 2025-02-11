import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './containers/task/task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [{
  path: '',
  component: TaskComponent
}, {
  path: 'create-task',
  component: CreateTaskComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
