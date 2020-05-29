import { Component } from '@angular/core';
import { FunctionsGlobalService } from './services/functions-global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isOnline: boolean

  constructor(private functionsGlobal : FunctionsGlobalService
  ) { }

  ngOnInit() {
  }

  onLogout() {

  }

  ngOnDestroy() {

  }
}
