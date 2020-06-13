import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post.model';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsSub: Subscription;
  public posts: Post[];
  constructor(private postServ: PostService,) {
   }

  ngOnInit() {
    this.postsSub = this.postServ.post$.subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {}
    );
    this.postServ.getAllPost();
  }
}
