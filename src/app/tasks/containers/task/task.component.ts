import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { selectCompletedTasks, selectInProgressTasks, selectNewTasks, TaskState, TaskStatus } from '../../store/reducer/task.reducer';
import { CreateNewTask, SaveTasks, UpdateTask } from '../../store/actions/task.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';


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
  private dialog = inject(MatDialog);

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

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Move task to a different list
      const movedTask = Object.assign({}, event.container.data[event.currentIndex]);
      if (event.container.id == 'inProgressList') {
        movedTask.status = TaskStatus.IN_PROGRESS;
        this.store$.dispatch(() => UpdateTask({ id: movedTask.id!, task: movedTask }))
      }

      if (event.container.id == 'newList') {
        movedTask.status = TaskStatus.NEW;
        this.store$.dispatch(() => UpdateTask({ id: movedTask.id!, task: movedTask }))
      }

      if (event.container.id == 'completedList') {
        movedTask.status = TaskStatus.COMPLETED;
        this.store$.dispatch(() => UpdateTask({ id: movedTask.id!, task: movedTask }))
      }

    }
  }

  openTaskForm() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '500px'
    });

    // perform delete action
    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.store$.dispatch(() => CreateNewTask({ task }));
      }
    })
  }
}
