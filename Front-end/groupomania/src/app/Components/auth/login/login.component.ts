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
  user: User;


  constructor(private formBuilder: FormBuilder,
              private authServ: AuthService,
              private appComp: AppComponent,
              private router: Router) { }

  ngOnInit() {
    localStorage.setItem('auth',JSON.stringify(false));                         // Set du localStorage pour initiliation
    localStorage.setItem('admin','false');
    this.loginForm = this.formBuilder.group({                                   // Initialisation du formulaire
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  // Validation du formulaire
  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authServ.login(email, password).then(
      (res: { userId: string, authToken: string}) => {
        localStorage.setItem('auth',JSON.stringify(true));
        this.appComp.isOnline = true;
        this.router.navigate(['/timeline']);
      }
    ).catch(
      (error) => {
        this.errorMsg = error.error.error;
      }
    );
  }
}
