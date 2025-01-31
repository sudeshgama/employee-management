import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authFeature } from '../../store/reducer/auth.reducer';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store$ = inject(Store);
  loginForm!: FormGroup<LoginForm>;
  hidePassword: boolean = true;
  errorMessage$!: Observable<string>;
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.isLoading$ = this.store$.select(authFeature.selectLoading);
    this.errorMessage$ = this.store$.select(authFeature.selectError);
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.store$.dispatch(() => login({ email, password }));
    }
  }
}
