import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for the AuthService and Router
    authService = jasmine.createSpyObj('AuthService', ['signUp']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Avoid errors related to unknown components or directives
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form when form is invalid', () => {
    // Set an invalid form value (e.g., missing required fields)
    component.signupForm.setValue({
      name: '',
      email: 'invalid-email',
      password: '',
      role: ''
    });

    // Call the onSubmit method
    component.onSubmit();

    // Check that signUp was not called since the form is invalid
    expect(authService.signUp).not.toHaveBeenCalled();
  });

  it('should check if form is valid', () => {
    // Set valid form values
    component.signupForm.setValue({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password123',
      role: 'admin'
    });

    // Check if the form is valid
    expect(component.signupForm.valid).toBeTruthy();
  });
});
