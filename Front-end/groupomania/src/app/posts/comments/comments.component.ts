import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/Comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() public comment: Comment

  constructor(public auth: AuthService,
              private comments: CommentService) { }

  ngOnInit(): void {
    console.log("this.comment",this.comment)
  }

  onTrashComment(postId){
    this.comments.deleteComment(postId).then(
      (response: { message: string }) => {
        console.log(response.message);
        // refresh de la liste des posts
        this.comments.getAllComments();
      }
    ).catch(
      (error) => {console.log(error) }
    );
  }

}
