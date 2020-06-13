import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private app: AppComponent,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      lastname: [null, Validators.required],
      firstname: [null, Validators.required],
      pseudo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    const lastname = this.signupForm.get('lastname').value;
    const firstname = this.signupForm.get('firstname').value;
    const pseudo = this.signupForm.get('pseudo').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.create(lastname, firstname, pseudo, email, password).then(
      (response: { message: string }) => {
        localStorage.setItem('auth',JSON.stringify(true))
        this.app.isOnline = true
        this.router.navigate(['/login']);
      }
    ).catch((error) => {
        console.error(error);
        this.errorMsg = error.message;
    });
  }

}
