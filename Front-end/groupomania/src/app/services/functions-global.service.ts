import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsGlobalService {

  public userOnline : boolean

  constructor() { }

getToken(){
  sessionStorage.getItem('log')
}

getOnline(){
  if (this.getToken() !== null){
    this.userOnline = true
  }else{
    this.userOnline = false
  }
}
}
