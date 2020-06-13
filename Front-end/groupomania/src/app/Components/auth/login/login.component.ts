import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;
  user: User


  constructor(private formBuilder: FormBuilder,
              private authServ: AuthService,
              private appServ: AppComponent,
              private router: Router) { }

  ngOnInit() {
    this.appServ.isAdmin = this.authServ.getUserIsAdmin()
    this.appServ.isOnline = false
    localStorage.setItem('auth',JSON.stringify(false))
    localStorage.setItem('admin',JSON.stringify(this.authServ.getUserIsAdmin()))
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authServ.login(email, password).then(
      (res: { userId: string, authToken: string}) => {
        localStorage.setItem('auth',JSON.stringify(true))
        this.appServ.isOnline = true
        this.router.navigate(['/timeline']);
      }
    ).catch(
      (error) => {
        this.errorMsg = error.error.error;
      }
    );
  }
}
