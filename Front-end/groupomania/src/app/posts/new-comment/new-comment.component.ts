import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/Post.model';
import { Comment } from 'src/app/models/Comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  @Input() public comment: Comment
  @Input() public posts: Post
  commentForm: FormGroup;
  public comments: Comment

  constructor(public auth: AuthService,
              private post: PostService,
              private comSer: CommentService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initCommentForm()
    this.comSer.getAllComments()
  }

  initCommentForm(){
    this.commentForm = this.formBuilder.group({
      pseudoComment: [this.posts.userPseudoPost],
      messageComment: ['Votre commentaire', Validators.required]
    });
  }

  onValidateComment(){
    const newComment = new Comment();
    newComment.pseudoComment = this.commentForm.get('pseudoComment').value;
    newComment.comment = this.commentForm.get('messageComment').value;
    this.comSer.newComment( this.posts.userIdPost, this.posts.id, newComment)
    this.comSer.getAllComments()
  }

}


