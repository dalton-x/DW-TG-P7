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
  isOnline = false
  onToken = new BehaviorSubject<boolean>(false);
  public userId: string;
  public firstname: string;
  public lastname: string;
  public pseudo: string;
  public imageUrl: string;
  public user: User;
  private authToken: string;
  public isAdmin: boolean;

  constructor(private http: HttpClient,
              private router: Router) {}

  // permet d'avoir le UserId
  getUserId() {
    if (this.userId){
      return this.userId;
    }else{
      return localStorage.getItem('userId')
    }
  }

  // Permet d'avoir le prénom de l'utilisateur
  getUserFistname() {
    return this.firstname;
  }

  // Permet d'avoir le nom de l'utilisateur
  getUserLastname() {
    return this.lastname;
  }

  // Permet d'avoir le pseudo de l'utilisateur
  getUserPseudo() {
    if (this.pseudo){
      return this.pseudo;
    }else{
      return localStorage.getItem('pseudo')
    }
  }

  // Permet d'avoir l'avatar de l'utilisateur
  getUserImageUrl() {
    return this.imageUrl;
  }

  // Permet d'avoir le token d'authentification
  getToken() {
    if (this.authToken){
      return this.authToken;
    }else{
      return localStorage.getItem('token')
    }
  }

  // Permet de savoir si l'utilisateur est administrateur
  getUserIsAdmin() {
    // if (this.isAdmin){
      return this.isAdmin;
    // }else{
    //   return JSON.parse(localStorage.getItem('admin'))
    // }
  }

  // Permet de mettre les infos de l'utilisateur en variable
  setCurrentUser(user: User) {
    this.user = user;
  }

  // Permet de recupérer les informations de l'utilisateur en fonction de son Id
  getCurrentUser(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/user/'+id);
  }

  // Permet de communiqué avec le serveur pour la création d'un utilisteur
  create(lastname: string , firstname: string , pseudo: string ,email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/signup', {
          lastname: lastname,
          firstname: firstname,
          pseudo: pseudo,
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

  // Permet de communiqué avec le serveur pour le login de l'utilisateur
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/login', {email: email, password: password}).subscribe(
        (response: {
          userId: string,
          email: string,
          firstname: string,
          lastname: string,
          pseudo: string,
          isAdmin: boolean,
          imageUrl: string,
          token: string}) => {
            this.userId = response.userId
            this.email = response.email
            this.firstname = response.firstname
            this.lastname = response.lastname
            this.pseudo = response.pseudo
            this.imageUrl = response.imageUrl
            this.authToken = response.token;
            this.isAdmin = response.isAdmin;
            localStorage.setItem('userId',this.userId);
            localStorage.setItem('token',this.authToken);
            localStorage.setItem('pseudo',this.pseudo)
            localStorage.setItem('admin',JSON.stringify(this.isAdmin))
            this.onToken.next(true);
            resolve(
              this.isOnline = true
              );
          },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // Permet de communiqué avec le serveur pour déconnecter l'utilisateur
  logout() {
    localStorage.clear();
    this.authToken = null;
    this.onToken.next(false);
    this.isOnline = false;
    this.router.navigate(['/index']);
  }

  // Permet de communiqué avec le serveur pour mettre a jour les information du profile utilisateur
  update(id: string ,userData : Object, image: string | File) {
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

  // Permet de communiqué avec le serveur pour supprimé le profil de l'utilisateur
  delete(id: string){
    return new Promise((resolve, reject) => {
      this.http.delete<User>('http://localhost:3000/api/user/'+ id )
      .subscribe(
        () => {
          this.onToken.next(false);
          console.log("l'utilisateur à été supprimé")
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
