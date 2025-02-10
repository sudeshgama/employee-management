import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';


describe('authGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is logged in', async () => {
    authService.isLoggedIn.and.returnValue(of(true)); // Simulate user being logged in

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    authGuard.canActivate(route, state).subscribe((result) => {
      expect(result).toBeTrue();
    });

    expect(authService.isLoggedIn).toHaveBeenCalled();
  });
});
