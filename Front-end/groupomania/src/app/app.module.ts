import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateIntervalModule} from 'ng-pipe-french-date-interval';

import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { DeleteUserComponent } from './profil/delete-user/delete-user.component';
import { IndexComponent } from './index/index.component';
import { LegalComponent } from './legal/legal.component';
import { ProfilComponent } from './profil/profil.component';
import { TimelineComponent } from './posts/timeline/timeline.component';
import { AuthService } from './services/auth.service';
import { UpdateUserComponent } from './profil/update-user/update-user.component';
import { PostComponent } from './posts/new-post/new-post.component';
import { PostsComponent } from './posts/posts/posts.component';
import { KeywordsComponent } from './posts/keywords/keywords.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FourOhFourComponent,
    DeleteUserComponent,
    IndexComponent,
    LegalComponent,
    ProfilComponent,
    TimelineComponent,
    UpdateUserComponent,
    PostComponent,
    PostsComponent,
    KeywordsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DateIntervalModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
