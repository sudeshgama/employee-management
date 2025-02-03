import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEmployeeById } from '../../store/reducer/employee.reducer';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  employee$!: Observable<Employee>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employee$ = this.store.select(selectEmployeeById(id));
  }
}
