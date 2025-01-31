import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface SignupFrom {
  email: FormControl<string>;
  name: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  signupForm!: FormGroup<SignupFrom>;

  roles: string[] = ['admin', 'user'];

  hidePassword: boolean = true;

  ngOnInit(): void {
    this.signupForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    })
  }

  get fullName(): AbstractControl {
    return this.signupForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.signupForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.signupForm.get('password')!;
  }

  get role(): AbstractControl {
    return this.signupForm.get('role')!;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, name, password, role } = this.signupForm.value;
      this.authService.signUp(email!, name!, password!, role!).subscribe((data) => {
        this.router.navigate(['/auth/login']);
      });
    }
  }
}
