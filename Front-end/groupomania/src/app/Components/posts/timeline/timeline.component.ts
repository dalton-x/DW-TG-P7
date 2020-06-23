import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  postsSub: Subscription;
  public posts: Post[];
  constructor(private postServ: PostService,) {
   }

  ngOnInit() {
    this.postsSub = this.postServ.post$.subscribe(      // Récupérations des posts par la base de données
      (posts) => {
        this.posts = posts;
      },
      (error) => {}
    );
    // Refresh des posts
    this.postServ.getAllPost();
  }
}
