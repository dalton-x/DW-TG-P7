import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public searchForm: FormGroup;
  keyword: string;
  postSub: Subscription;
  posts: Post[];

  //template
  public mood: string;
  public title: string;
  public imagePostUrl: string;
  public keywords: string;
  public message: string;
  public postDate: Date;
  public userPseudoPost: string;

  constructor(private post: PostService,
              private auth: AuthService,
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
    this.post.getPostByKeywords(this.keywords)
    .then(
      (response: {message: string}) => {
        //console.log("response.message",response)
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const element = response[key];
            console.log("element",element)
            this.mood = element.mood;
            this.title = element.title;
            this.imagePostUrl = element.imagePostUrl;
            this.keywords = element.keywords;
            this.message = element.message;
            this.postDate = element.posDate;
            this.userPseudoPost = element.userPseudoPost;
          }
        }
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
