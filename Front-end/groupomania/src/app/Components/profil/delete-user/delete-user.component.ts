import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit, OnDestroy {

  secondes: number;
  start: number;
  counterSubscription: Subscription;

  constructor(
      private router: Router,
      private authServ: AuthService,
      private appComp: AppComponent
  ) { }

  ngOnInit() {
    const start = 3
    const counter = Observable.interval(1000);
    this.authServ.delete(this.authServ.getUserId())                         // Envoie de la demande de delete du profil au service
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = start - value;
        if (this.secondes < 0){                                             // Mise en place de compte a rebours
          this.authServ.logout();                                           // Déconnection de l'utilisateur
          localStorage.clear()                                              // Nettoyage du localStorage
          localStorage.setItem('auth',JSON.stringify(false))                // Set du localStorage en false
          this.appComp.isOnline = false                                     // Reset de la variable isOnline
          this.router.navigate(['/index']);                                 // Renvoie vers l'index
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }

  // Nettoyage des subscriptions
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
