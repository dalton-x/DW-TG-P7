import { Component } from '@angular/core';
import { FunctionsGlobalService } from './services/functions-global.service';
import { AuthService } from './services/auth.service';
import { Subscription} from 'rxjs';
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
  isAdmin: boolean;
  authSubscription: Subscription;

  private updateSubscription: Subscription;

  constructor(public auth: AuthService,
              private router: Router
  ) { }

  ngOnInit() {

    //refresh auto des posts toutes les 10 minutes (600000)
    // this.updateSubscription = interval(10000).subscribe(
    //   (val) => {
    //     this.post.getAllPost();
    //   }
    // );

    this.isAuth = JSON.parse(localStorage.getItem('auth'));

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
