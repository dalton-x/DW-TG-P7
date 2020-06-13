import { Component } from '@angular/core';
import { FunctionsGlobalService } from './services/functions-global.service';
import { AuthService } from './services/auth.service';
import { Subscription, interval} from 'rxjs';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuth: boolean;
  isOnline: boolean;
  isAdmin: Boolean;
  authSubscription: Subscription;

  private updateSubscription: Subscription;

  constructor(public auth: AuthService,
              private router: Router,
              private post: PostService
  ) { }

  ngOnInit() {

    this.isAuth = JSON.parse(localStorage.getItem('auth'));
    this.isAdmin = JSON.parse(localStorage.getItem('admin'))

    this.authSubscription = this.auth.onToken.subscribe(
      (auth) => {
        this.isAuth = JSON.parse(localStorage.getItem('auth'));
      }
    );
    let getSession = localStorage.getItem('auth')
    if (JSON.parse(getSession)) {
      this.authSubscription = this.auth.onToken.subscribe(
        (auth) => {
          if (getSession == JSON.parse(getSession) || getSession == null){
            this.isOnline = false
            localStorage.setItem('auth',JSON.stringify(auth))
            // localStorage.setItem('admin',JSON.stringify(this.auth.getUserIsAdmin()))
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
    this.updateSubscription.unsubscribe();
  }
}
