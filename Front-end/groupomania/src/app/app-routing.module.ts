import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//routes
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
