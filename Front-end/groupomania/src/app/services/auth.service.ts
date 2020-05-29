import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email: string;
  private id: string;
  private user: User;

  constructor(private http: HttpClient,
              private router: Router) {}

  getUserId() {
    return this.id;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  create(lastname: string , firstname: string , pseudo: string ,email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/signup', {
          lastname: lastname ,
          firstname: firstname ,
          pseudo: pseudo ,
          email: email,
          password: password,
        }).subscribe(
        (response: { message: string }) => {
          console.log("Utilisateaur crée")
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/login', {email: email, password: password}).subscribe(
        (response: {userId: string, token: string}) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.router.navigate(['/index']);
  }
}
