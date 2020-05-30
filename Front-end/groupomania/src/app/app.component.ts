import { Component } from '@angular/core';
import { FunctionsGlobalService } from './services/functions-global.service';
import { AuthService } from './services/auth.service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuth: boolean;
  isOnline: boolean;
  authSubscription: Subscription;

  constructor(private functionsGlobal : FunctionsGlobalService,
              private auth: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    this.authSubscription = this.auth.onToken.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
    let getSession = localStorage.getItem('auth')
    if (JSON.parse(getSession)) {
      this.authSubscription = this.auth.onToken.subscribe(
        (auth) => {
          if (getSession == JSON.parse(getSession) || getSession == null){
            this.isOnline = false
            localStorage.setItem('auth',JSON.stringify(auth))
            this.router.navigate(['/index'])
          }else{
            this.isOnline = true
            this.router.navigate(['/timeline'])
          }
        }
      );
    }else{
      this.isOnline = false
    }

  }

  onLogout() {
    this.auth.logout();
    localStorage.setItem('auth',JSON.stringify(false))
    this.isOnline = false
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
