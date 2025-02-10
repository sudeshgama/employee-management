import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { login } from '../../store/actions/auth.actions';
import { authFeature } from '../../store/reducer/auth.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  // Mock initial state of the store
  const initialState = {
    auth: {
      isLoading: false,
      error: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressSpinner,
        StoreModule.forRoot({})
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }), // Mock the store with initial state
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should have the required email validator', () => {
    const emailControl = component.email;
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should have the required password validator', () => {
    const passwordControl = component.password;
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
    passwordControl?.setValue('short');
    expect(passwordControl?.valid).toBeFalsy();
    passwordControl?.setValue('validPassword123');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should not dispatch login action when form is invalid', () => {
    spyOn(store, 'dispatch');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('validPassword123');

    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should set isLoading$ from store', () => {
    store.overrideSelector(authFeature.selectLoading, true);
    component.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBeTrue();
    });
  });

  it('should set errorMessage$ from store', () => {
    store.overrideSelector(authFeature.selectError, 'Error message');
    component.errorMessage$.subscribe(errorMessage => {
      expect(errorMessage).toBe('Error message');
    });
  });

  it('should toggle password visibility when hidePassword changes', () => {
    const initialValue = component.hidePassword;
    component.hidePassword = !initialValue;
    expect(component.hidePassword).toBe(!initialValue);
  });
});