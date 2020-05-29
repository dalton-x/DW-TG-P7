import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppComponent } from '../app.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private app: AppComponent,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (res) => {
        this.auth.onToken.subscribe(
          (auth) => {
            if (auth) {
              res.next(true);
              this.router.navigate(['/timeline']);
            } else {
              this.router.navigate(['/profil']);
            }
          }
        );
      }
    );
  }
}
