import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  newTasks: Task[] = [
    { title: 'Task 1', description: 'This is a new task.' },
    { title: 'Task 2', description: 'This is another new task.' },
  ];

  inProgressTasks: Task[] = [
    { title: 'Task 3', description: 'This task is in progress.' },
  ];

  completedTasks: Task[] = [
    { title: 'Task 4', description: 'This task is completed.' },
  ];

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
