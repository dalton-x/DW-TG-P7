import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  private myHeaders = new Headers()

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token')                                                 // Récupération du token dans la localStorage
    if(token) {                                                                                 // Si token OK
      this.myHeaders.set('Authorization', 'Bearer ' + token)                                    // Set du token dans le header
      return true;
    } else {
      this.router.navigate(['/login']);                                                         // Si pas de token retour vers le login
      return false
    }
  }
}
