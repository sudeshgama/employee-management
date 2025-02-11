import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskStatus } from '../../store/reducer/task.reducer';
import { MatDialogRef } from '@angular/material/dialog';

export interface CreateTaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup<CreateTaskForm>;
  private fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<CreateTaskComponent>);


  ngOnInit(): void {
    this.taskForm = this.fb.nonNullable.group({
      title: [''],
      description: [''],
      status: [TaskStatus.NEW]
    })
  }

  get title(): AbstractControl {
    return this.taskForm.get('title')!;
  }

  get description(): AbstractControl {
    return this.taskForm.get('description')!;
  }

  get status(): AbstractControl {
    return this.taskForm.get('status')!;
  }

  onConfirm() {
    this.dialogRef.close(this.taskForm.value);
  }

}
