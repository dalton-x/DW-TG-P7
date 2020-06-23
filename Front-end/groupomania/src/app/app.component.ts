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

  isAuth: boolean = false;
  isOnline: boolean = false;
  isAdmin: Boolean = false;
  authSubscription: Subscription;

  private updateSubscription: Subscription;

  constructor(public auth: AuthService,
              private router: Router,
              private post: PostService
  ) { }

  ngOnInit() {
    // Récupération des information dans le localStorage
    this.isAuth = JSON.parse(localStorage.getItem('auth'));
    this.isAdmin = JSON.parse(localStorage.getItem('admin'))

    // Subcription pour le tooken
    this.authSubscription = this.auth.onToken.subscribe(
      (auth) => {
        this.isAuth = JSON.parse(localStorage.getItem('auth'));
      }
    );

    // Vérification de la connection et du token pour acces aux pages authentifiées
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

  // Boutton de déconnection
  onLogout() {
    this.auth.logout();
    localStorage.setItem('auth',JSON.stringify(false))
    this.isOnline = false
    this.ngOnInit()
  }

  // Suppression des subscribe
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }
}
