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
        this.secondes = (value - start)*-1;
        if (this.secondes < 0){
          this.router.navigate(['/profil']);
          this.counterSubscription.unsubscribe();
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

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
