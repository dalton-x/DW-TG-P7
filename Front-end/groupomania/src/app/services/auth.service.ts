import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email: string;
  onToken = new BehaviorSubject<boolean>(false);
  public userId: string;
  public firstname: string;
  public lastname: string;
  public pseudo: string;
  public imageUrl: string;
  private user: User;
  private authToken: string;

  constructor(private http: HttpClient,
              private router: Router) {}

  getUserId() {
    return this.userId;
  }
  getUserFistname() {
    return this.firstname;
  }
  getUserLastname() {
    return this.lastname;
  }
  getUserPseudo() {
    return this.pseudo;
  }
  getUserImageUrl() {
    return this.imageUrl;
  }

  getToken() {
    return this.authToken;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getCurrentUser(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/user/'+id);
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
          this.onToken.next(true);
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
        (response: {
          userId: string,
          email: string,
          firstname: string,
          lastname: string,
          pseudo: string,
          imageUrl: string,
          token: string}) => {
            this.userId = response.userId
            this.email = response.email
            this.firstname = response.firstname
            this.lastname = response.lastname
            this.pseudo = response.pseudo
            this.imageUrl = response.imageUrl
            this.authToken = response.token;
            this.onToken.next(true);
            resolve(
              );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.onToken.next(false);
    this.router.navigate(['/index']);
  }

  update(id: string ,userData : Object, image: string | File) {
    console.log("IMAGE",image)
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.put('http://localhost:3000/api/user/' + id, userData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('user', JSON.stringify(userData));
        formData.append('image', image);
        this.http.put('http://localhost:3000/api/user/'+id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
}
