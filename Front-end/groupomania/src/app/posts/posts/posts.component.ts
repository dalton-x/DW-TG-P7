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

  public postId
  constructor(
    public auth: AuthService,
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

  onLike(postId: string){
    console.log("J'aime le post : "+postId)
  }

  onOpenComms(postId){
    console.log("Je commente le post : "+postId)
  }

  onTrashPost(postId){
    this.post.deletePost(postId).then(
      (response: { message: string }) => {
        console.log(response.message);
        // refresh de la liste des posts
        this.post.getAllPost();
      }
    ).catch(
      (error) => {console.log(error) }
    );
  }
}
