import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authFeature } from './auth/store/reducer/auth.reducer';
import { logout } from './auth/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'employee-management';
  isUserLoggedIn$!: Observable<boolean>;

  private store$ = inject(Store);

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.store$.select(authFeature.selectIsLoggedIn);
  }

  logout(): void {
    this.store$.dispatch(() => logout());
  }
}
