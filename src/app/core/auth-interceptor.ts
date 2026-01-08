import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken(); // or localStorage.getItem('token')

  // ✅ ADD TOKEN TO REQUEST
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // ✅ THEN SEND REQUEST
  return next(req).pipe(
    catchError(err => {

      // allow login API errors
      if (req.url.includes('/login')) {
        return throwError(() => err);
      }

      if (err.status === 401) {
        authService.clearSession();
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
