import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//routes
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './services/auth-guard.service';
import { UpdateUserComponent } from './profil/update-user/update-user.component';
import { DeleteUserComponent } from './profil/delete-user/delete-user.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'deleteUser', component: DeleteUserComponent },
  { path: '', component: IndexComponent},
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: '/not-found'} //mettre a la fin des routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
