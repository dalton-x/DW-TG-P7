import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsGlobalService {

  public userOnline : boolean

  constructor() { }

  getLogin(){
    sessionStorage.getItem('log')
  }

  getOnline(){
    if (this.getLogin() !== null){
      this.userOnline = true
    }else{
      this.userOnline = false
    }
  }

  // ajout d'un "s" si num > 1
  getPlural(num) {
    if (num == 1) {
        return ""
    } else {
        return "s"
    }
  }
}
