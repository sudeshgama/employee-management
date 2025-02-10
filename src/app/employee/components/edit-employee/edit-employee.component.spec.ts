import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmployeeComponent } from './edit-employee.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { employeeFeature, selectEmployeeById } from '../../store/reducer/employee.reducer';
import { updateEmployee } from '../../store/actions/employee.actions';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let store: MockStore;
  let route: ActivatedRoute;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    employee: {
      loading: false,
      error: '',
      employees: [] // mock employees
    },
  };

  const mockEmployee: Employee = {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    position: 'Developer',
    department: 'Engineering',
    phone: '123-456-7890',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmployeeComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }, // Mock the route parameter 'id'
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select loading and error states from the store', () => {
    // Override selectors
    store.overrideSelector(employeeFeature.selectLoading, true);
    store.overrideSelector(employeeFeature.selectError, 'Some error occurred');

    component.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBeTrue();
    });

    component.errorMessage$.subscribe(errorMessage => {
      expect(errorMessage).toBe('Some error occurred');
    });
  });


});
