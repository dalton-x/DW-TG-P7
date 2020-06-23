import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  secondes: number;
  start: number;
  counterSubscription: Subscription;

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
    const start = 3
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = start - value;
        if (this.secondes < 0){                               // Mise en place de compte a rebours
          this.router.navigate(['/profil']);                  // Renvoie vers la page profil
          this.counterSubscription.unsubscribe();             // Arret de la subcription
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
