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
      private authServ: AuthService,
      private appComp: AppComponent
  ) { }

  ngOnInit(): void {
    const start = 3
    const counter = Observable.interval(1000);
    this.authServ.delete(this.authServ.getUserId())
    counter.subscribe(
      (value) => {
        this.secondes = (value - start)*-1;
        if (this.secondes < 0){
          this.authServ.logout();
          localStorage.setItem('auth',JSON.stringify(false))
          this.appComp.isOnline = false
          this.router.navigate(['/index']);
        }
      },
      (error) => {
        console.log(error);
        this.counter.unsubscribe();
      },
      () => {
        console.log('Observable complete!');
      }
    );
    this.counter.unsubscribe();
  }

}
