import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  public posts

  constructor(private post: PostService,
              public auth: AuthService,
              private formBuilder: FormBuilder
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
        (Posts) => {
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
        (Posts) => {
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

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
