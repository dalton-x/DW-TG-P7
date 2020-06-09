import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.injector.get(AuthService);
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
    });
    return next.handle(newRequest);
  }
}
