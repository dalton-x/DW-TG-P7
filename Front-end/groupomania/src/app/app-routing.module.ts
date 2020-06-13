import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// authentification
import { AuthGuard } from './services/auth-guard.service';

// routes
import { SignupComponent } from './components/auth/signup/signup.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TimelineComponent } from './components/posts/timeline/timeline.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UpdateUserComponent } from './components/profil/update-user/update-user.component';
import { DeleteUserComponent } from './components/profil/delete-user/delete-user.component';
import { LegalComponent } from './components/legal/legal.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent},
  { path: 'legal', component: LegalComponent },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'updateUser', component: UpdateUserComponent, canActivate: [AuthGuard]},
  { path: 'deleteUser', component: DeleteUserComponent, canActivate: [AuthGuard]},
  { path: 'timeline/post', component: NewPostComponent, canActivate: [AuthGuard]},
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
