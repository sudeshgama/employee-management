import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeContainerComponent } from './employee-container.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeState } from '../../store/reducer/employee.reducer';
import { deleteEmployee, saveEmployees } from '../../store/actions/employee.actions';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteEmployeeComponent } from '../../components/delete-employee/delete-employee.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';

describe('EmployeeContainerComponent', () => {
  let component: EmployeeContainerComponent;
  let fixture: ComponentFixture<EmployeeContainerComponent>;
  let store: jasmine.SpyObj<Store<EmployeeState>>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock Store
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    store.select.and.returnValue(of([]));  // Simulating an empty list of employees

    // Mock Dialog and Router
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [
        EmployeeContainerComponent,
        EmployeeListComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the edit employee route on editEmployee', () => {
    const employeeId = '1';

    component.editEmployee(employeeId);

    expect(router.navigate).toHaveBeenCalledWith([`employees/edit/${employeeId}`]);
  });

  it('should open the delete employee dialog on deleteEmployee', () => {
    const employeeId = '1';

    dialog.open.and.returnValue({
      afterClosed: () => of(true)  // Simulate dialog close with 'true' as the result
    } as any);

    component.deleteEmployee(employeeId);

    expect(dialog.open).toHaveBeenCalledWith(DeleteEmployeeComponent, {
      width: '300px',
      data: { employeeId }
    });
  });
});
