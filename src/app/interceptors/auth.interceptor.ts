import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();

    if (token !== null && token !== undefined && token.length > 0) {
      const headers = httpRequest.headers.set('Authorization', `Bearer ${token}`);
      const authReq = httpRequest.clone({ headers });
      return next.handle(authReq);
     // return next.handle(httpRequest);
    } else {
      return next.handle(httpRequest);
    }
  }
}