import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/Post.model';
import { FunctionsGlobalService } from 'src/app/services/functions-global.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsSub: Subscription;
  public posts: Post[];
  public display: boolean;
  public CommOpen: boolean;

  public postId
  constructor(
    public auth: AuthService,
    private post: PostService,
    public funcGlob: FunctionsGlobalService) {
   }

  ngOnInit() {
    this.display = false
    this.postsSub = this.post.post$.subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {}
    );
    this.post.getAllPost();
  }

  // onLike(postId: string){
  //   console.log("J'aime le post : "+postId)
  // }

  onOpenComms(postId){
    if (this.display != true){
      this.display = true
    }else{
      this.display = false
    }
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
