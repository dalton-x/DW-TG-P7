import { Component } from '@angular/core';
import { FunctionsGlobalService } from './services/functions-global.service';
import { AuthService } from './services/auth.service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isOnline: boolean;
  authSubscription: Subscription;

  constructor(private functionsGlobal : FunctionsGlobalService,
              private auth: AuthService
  ) { }

  ngOnInit() {
    let getSession = localStorage.getItem('auth')
    this.authSubscription = this.auth.onToken.subscribe(
      (auth) => {
        if (getSession == JSON.parse(getSession) || getSession == null){
          this.isOnline = false
          localStorage.setItem('auth',JSON.stringify(auth))
        }else{
        this.isOnline = true
        }
      }
    );
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
