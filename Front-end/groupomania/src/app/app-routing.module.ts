import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// authentification
import { AuthGuard } from './services/auth-guard.service';

// routes
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { TimelineComponent } from './posts/timeline/timeline.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ProfilComponent } from './profil/profil.component';
import { UpdateUserComponent } from './profil/update-user/update-user.component';
import { DeleteUserComponent } from './profil/delete-user/delete-user.component';
import { LegalComponent } from './legal/legal.component';
import { PostComponent } from './posts/post/post.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent},
  { path: 'legal', component: LegalComponent },
  { path: 'timeline', component: TimelineComponent}, //, canActivate: [AuthGuard]
  { path: 'profil', component: ProfilComponent}, //, canActivate: [AuthGuard]
  { path: 'updateUser', component: UpdateUserComponent}, //, canActivate: [AuthGuard]
  { path: 'deleteUser', component: DeleteUserComponent}, //, canActivate: [AuthGuard]
  { path: 'timeline/post', component: PostComponent}, //, canActivate: [AuthGuard]
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
