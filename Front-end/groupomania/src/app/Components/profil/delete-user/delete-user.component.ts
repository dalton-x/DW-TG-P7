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
    console.log("SUPPR")
    const start = 3
    const counter = Observable.interval(1000);
    this.authServ.delete(this.authServ.getUserId())
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = (value - start)*-1;
        if (this.secondes < 0){
          this.authServ.logout();
          localStorage.clear()
          localStorage.setItem('auth',JSON.stringify(false))
          this.appComp.isOnline = false
          this.router.navigate(['/index']);
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
