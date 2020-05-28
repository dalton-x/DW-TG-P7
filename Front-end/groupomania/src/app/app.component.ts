import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public online: boolean

  constructor() { }

  ngOnInit() {
    const token = sessionStorage.getItem('token')
    if (token !== null){
      console.log("NON NULL")
      this.online = true
    }else{
      console.log("NULL")
      this.online = false
    }

  }

  onLogout() {

  }

  ngOnDestroy() {

  }
}
