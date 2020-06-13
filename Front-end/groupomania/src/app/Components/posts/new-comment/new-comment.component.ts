import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/Post.model';
import { Comment } from 'src/app/models/Comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/User.model';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  @Input() public comment: Comment
  @Input() public posts: Post
  commentForm: FormGroup;
  public comments: Comment;
  public user: User;

  constructor(public authServ: AuthService,
              private postServ: PostService,
              private comServ: CommentService,
              private formBuilder: FormBuilder,
              public postComp: PostComponent) { }

  ngOnInit(): void {
    this.initCommentForm();
  }

  initCommentForm(){
    this.commentForm = this.formBuilder.group({
      pseudoComment: [this.authServ.getUserPseudo()],
      messageComment: ['', Validators.required]
    });
  }

  onValidateComment(){
    const newComment = new Comment();
    newComment.pseudoComment = this.commentForm.get('pseudoComment').value;
    newComment.comment = this.commentForm.get('messageComment').value;
    this.comServ.newComment(this.posts.id, newComment)
    this.comServ.getAllComments(this.posts.id)
    this.postComp.onOpenComms();
    this.postServ.getAllPost();
  }
}
