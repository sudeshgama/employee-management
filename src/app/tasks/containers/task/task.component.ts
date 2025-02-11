import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { selectCompletedTasks, selectInProgressTasks, selectNewTasks, TaskState } from '../../store/reducer/task.reducer';
import { SaveTasks } from '../../store/actions/task.actions';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  private store$: Store<TaskState> = inject(Store);
  inProgressTasks$!: Observable<Task[]>;
  newTasks$!: Observable<Task[]>;
  completedTasks$!: Observable<Task[]>;

  ngOnInit(): void {
    this.store$.dispatch(() => SaveTasks());
    this.newTasks$ = this.store$.select(selectNewTasks);
    this.inProgressTasks$ = this.store$.select(selectInProgressTasks);
    this.completedTasks$ = this.store$.select(selectCompletedTasks);
  }

  // Handle task drop event
  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Move task within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move task to a different list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
