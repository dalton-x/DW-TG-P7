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
import { PostComponent } from './posts/new-post/new-post.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent},
  { path: 'legal', component: LegalComponent },
  { path: 'timeline', canActivate: [AuthGuard], component: TimelineComponent},
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent},
  { path: 'updateUser', canActivate: [AuthGuard], component: UpdateUserComponent},
  { path: 'deleteUser', canActivate: [AuthGuard], component: DeleteUserComponent},
  { path: 'timeline/post', canActivate: [AuthGuard], component: PostComponent},
  { path: '', component: IndexComponent},
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: '/not-found'} //mettre à la fin des routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
