import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/Post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsSub: Subscription;
  posts: Post[];

  //template
  public mood: string;
  public title: string;
  public imagePostUrl: string;
  public keywords: string;
  public message: string;
  public postDate: Date;
  public userPseudoPost: string;

  // envoie des informations au template
  public template_posts_title:string
  public template_posts_image:string
  public template_posts_message:string
  public template_posts_userPost:string
  public template_posts_mood:string
  public template_posts_date:Date

  public openComms = false

  public postId
  constructor(
    private auth: AuthService,
    private post: PostService) {
   }

  ngOnInit() {
    this.postsSub = this.post.post$.subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {}
    );
    this.post.getAllPost();
  }

  onLike(){

  }

  onOpenComms(){
    this.openComms = true
  }

  onCloseComms(){
    this.openComms = false
  }

}
