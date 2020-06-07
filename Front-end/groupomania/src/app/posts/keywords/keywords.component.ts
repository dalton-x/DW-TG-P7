import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  public searchForm: FormGroup;
  keywords: string;
  postSub: Subscription;
  public posts

  constructor(private post: PostService,
              public auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    })
  }

  onSearch(){
    this.keywords = this.searchForm.get('search').value
    if (this.keywords){
      this.post.getPostByKeywords(this.keywords)
      .then(
        (Posts) => {
        this.posts = Posts;
        console.log("this.posts",this.posts)
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
}
