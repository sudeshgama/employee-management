import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { authFeature } from '../store/reducer/auth.reducer';

// Mocking the Store and providing fake values
class MockStore {
  select(selector: any) {
    switch (selector) {
      case authFeature.selectIsLoggedIn:
        return of(true); // Simulate user logged in
      case authFeature.selectToken:
        return of('fake-jwt-token'); // Fake token
      case authFeature.selectIsAdmin:
        return of(true); // Simulate admin user
      default:
        return of(null);
    }
  }

  dispatch(action: any) {
    // Dispatch action logic
  }
}
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: Store,
          useClass: MockStore
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests are left after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
