import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { logout } from './auth/store/actions/auth.actions';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    auth: {
      isLoggedIn: true, // Mock initial logged-in state
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        RouterModule
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => 'mock-id' }
            },
            params: of({ id: 'mock-id' }) // Optional: If you want to test the Observable params
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should select the correct user login state from the store', () => {
    component.isUserLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
    });
  });

});
