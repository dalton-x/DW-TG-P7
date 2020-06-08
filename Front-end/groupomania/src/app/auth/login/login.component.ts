import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
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
              private auth: AuthService,
              private app: AppComponent,
              private router: Router) { }

  ngOnInit() {
    this.app.isOnline = false
    localStorage.setItem('auth',JSON.stringify(false))
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password).then(
      () => {
        localStorage.setItem('auth',JSON.stringify(true))
        this.app.isOnline = true
        this.router.navigate(['/timeline']);
      }
    ).catch(
      (error) => {
        this.errorMsg = error.message;
      }
    );
  }
}
