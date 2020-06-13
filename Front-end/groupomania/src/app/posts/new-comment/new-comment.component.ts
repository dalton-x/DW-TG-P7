import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/Post.model';
import { Comment } from 'src/app/models/Comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/User.model';

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

  constructor(public auth: AuthService,
              private post: PostService,
              private comSer: CommentService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initCommentForm();
    // this.comSer.getAllComments(this.posts.id);
  }

  initCommentForm(){
    this.commentForm = this.formBuilder.group({
      pseudoComment: [this.auth.getUserPseudo()],
      messageComment: ['', Validators.required]
    });
  }

  onValidateComment(){
    const newComment = new Comment();
    newComment.pseudoComment = this.commentForm.get('pseudoComment').value;
    newComment.comment = this.commentForm.get('messageComment').value;
    this.comSer.newComment(this.posts.id, newComment)
    this.post.getAllPost()
  }

}


