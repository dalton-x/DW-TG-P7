import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateIntervalModule} from 'ng-pipe-french-date-interval';

import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { DeleteUserComponent } from './components/profil/delete-user/delete-user.component';
import { IndexComponent } from './components/index/index.component';
import { LegalComponent } from './components/legal/legal.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TimelineComponent } from './components/posts/timeline/timeline.component';
import { AuthService } from './services/auth.service';
import { UpdateUserComponent } from './components/profil/update-user/update-user.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { KeywordsComponent } from './components/posts/keywords/keywords.component';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { NewCommentComponent } from './components/posts/new-comment/new-comment.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/posts/post/post.component';

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
    NewPostComponent,
    KeywordsComponent,
    CommentsComponent,
    NewCommentComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DateIntervalModule,
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
