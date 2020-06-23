import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/Comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() public comment: Comment
  @Input() public posts: Post

  constructor(public authServ: AuthService,
              private postServ: PostService,
              private commentsServ: CommentService) { }

  ngOnInit(): void {
  }

  // Suppression du commentaire
  onTrashComment(){
    this.commentsServ.deleteComment(this.comment.id).then(
      (response: { message: string }) => {
        console.log(response.message);

        // refresh de la liste des posts
        this.postServ.getAllPost();
        // Refresh de la liste des commentaires du post
        this.commentsServ.getAllComments(this.posts.id);
      }
    ).catch(
      (error) => {console.log(error) }
    );
  }

}
