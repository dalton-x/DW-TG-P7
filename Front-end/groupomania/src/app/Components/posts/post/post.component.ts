import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsGlobalService } from 'src/app/services/functions-global.service';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postsSub: Subscription;
  public posts: Post[];
  @Input() public post: Post
  public display: boolean;
  public CommOpen: boolean;

  public postId;
  public hide: boolean;
  constructor(
              public authServ: AuthService,
              public commServ: CommentService,
              private postServ: PostService,
              public funcGlob: FunctionsGlobalService) { }

  ngOnInit() {
    this.display = false                      // Initialisation de la classe CSS
  }

  // onLike(postId: string){
  //   console.log("J'aime le post : "+postId)
  // }

  // Affichage des commentaires avec la gestion de la classe CSS
  onOpenComms(){
    if (this.display != true){
      this.display = true
    }else{
      this.display = false
      this.postServ.getAllPost();
    }
  }

  // fontion pour la suppression d'un post
  onTrashPost(postId){
    this.postServ.deletePost(postId).then(    // envoie vers le service
      (response: { message: string }) => {
        console.log(response.message);
        // refresh de la liste des posts
        this.postServ.getAllPost();
      }
    ).catch(
      (error) => {console.log(error) }
    );
  }

}
