import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteEmployeeComponent } from './delete-employee.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('DeleteEmployeeComponent', () => {
  let component: DeleteEmployeeComponent;
  let fixture: ComponentFixture<DeleteEmployeeComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteEmployeeComponent>>;
  let data: any;

  beforeEach(async () => {
    // Create a spy for the MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    // Set mock data for MAT_DIALOG_DATA
    data = { employeeId: '1', employeeName: 'John Doe' };

    await TestBed.configureTestingModule({
      declarations: [DeleteEmployeeComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteEmployeeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject MatDialogRef and MAT_DIALOG_DATA', () => {
    expect(component.dialogRef).toBe(dialogRefSpy);
    expect(component.data).toBe(data);
  });

  it('should close the dialog with `true` when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with `false` when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
