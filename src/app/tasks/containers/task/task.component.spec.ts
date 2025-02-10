import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task, TaskComponent } from './task.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [
        DragDropModule,
        MatCardModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct tasks in each list', () => {
    expect(component.newTasks.length).toBe(2);
    expect(component.inProgressTasks.length).toBe(1);
    expect(component.completedTasks.length).toBe(1);
  });

});
