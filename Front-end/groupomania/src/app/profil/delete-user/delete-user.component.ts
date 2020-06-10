import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  secondes: number;
  start: number;
  counter: Subscription;

  constructor(
      private router: Router,
      private auth: AuthService,
      private app: AppComponent
  ) { }

  ngOnInit(): void {
    const start = 3
    const counter = Observable.interval(1000);
    counter.subscribe(
      (value) => {
        this.secondes = (value - start)*-1;
        if (this.secondes < 0){
          this.auth.logout();
          sessionStorage.setItem('auth',JSON.stringify(false))
          this.auth.delete(this.auth.getUserId())
          this.app.isOnline = false
          this.router.navigate(['/index']);
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
