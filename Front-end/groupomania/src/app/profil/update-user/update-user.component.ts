import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  secondes: number;
  start: number;
  counter: Subscription;

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
    const start = 3
    const counter = Observable.interval(1000);
    counter.subscribe(
      (value) => {
        this.secondes = (value - start)*-1;
        if (this.secondes < 0){
          this.router.navigate(['/profil']);
          this.counter.unsubscribe();
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
}
