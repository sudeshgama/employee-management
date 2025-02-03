import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { employeeFeature, selectEmployeeById } from '../../store/reducer/employee.reducer';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { updateEmployee } from '../../store/actions/employee.actions';

export interface EmployeeFrom {
  name: FormControl<string>;
  email: FormControl<string>;
  position: FormControl<string>;
  department: FormControl<string>;
  phone: FormControl<string>;
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store$ = inject(Store);
  private fb = inject(FormBuilder);
  employee$!: Observable<Employee>;
  employeeForm!: FormGroup<EmployeeFrom>;
  id!: string;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  ngOnInit(): void {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.store$.select(selectEmployeeById(this.id)).pipe(
      take(1)).
      subscribe((employee) => {
        this.employeeForm.patchValue(employee);
      });
    this.isLoading$ = this.store$.select(employeeFeature.selectLoading);
    this.errorMessage$ = this.store$.select(employeeFeature.selectError);
  }

  get name(): AbstractControl {
    return this.employeeForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.employeeForm.get('email')!;
  }

  get position(): AbstractControl {
    return this.employeeForm.get('position')!;
  }

  get department(): AbstractControl {
    return this.employeeForm.get('department')!;
  }

  get phone(): AbstractControl {
    return this.employeeForm.get('phone')!;
  }

  onSubmit(): void {
    if (this.employeeForm.value && this.id) {
      const { name, email, position, department, phone } = this.employeeForm.value;
      this.store$.dispatch(() => updateEmployee({
        id: this.id,
        employee: {
          name: name || '',
          email: email || '',
          position: position || '',
          department: department || '',
          phone: phone || ''
        }
      }))
    }
  }
}
