import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/Post.model';
import { FunctionsGlobalService } from 'src/app/services/functions-global.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  public searchFormKeyword: FormGroup;
  public searchFormUser: FormGroup;
  keywords: string;
  user: string;
  public posts: Post[];

  constructor(private post: PostService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              public funcGlob: FunctionsGlobalService
              ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.searchFormKeyword = this.formBuilder.group({
      searchKeywords: ['', Validators.required]
    })
    this.searchFormUser = this.formBuilder.group({
      searchUser: ['', Validators.required]
    })
  }

  onSearchKeyword(){
    this.keywords = this.searchFormKeyword.get('searchKeywords').value
    if (this.keywords){
      this.post.getPostByKeywords(this.keywords)
      .then(
        (Posts: Post[]) => {
        this.posts = Posts;
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onSearchUser(){
    this.user = this.searchFormUser.get('searchUser').value
    if (this.user){
      this.post.getPostByUser(this.user)
      .then(
        (Posts: Post[]) => {
        this.posts = Posts;
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onCloseSearch(){
    this.posts = null
  }

  scrollOnPost(postId: string){
    document.querySelector("#post_" + postId).scrollIntoView({behavior: "smooth"});
  }
}
