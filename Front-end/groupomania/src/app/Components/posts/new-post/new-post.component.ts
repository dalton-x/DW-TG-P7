import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.model';
import { Router } from '@angular/router';
import { Post } from '../../../models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-Newpost',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  user: User;
  post: Post;
  title: string;
  mood: string;
  keywords: string;
  message: string;
  imagePostUrl: File = null;
  imageUpload: string;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getCurrentUser(this.auth.getUserId()).subscribe(
      (response: User) => {
        this.auth.setCurrentUser(response);
        if (response !== undefined) {
          this.user = response
          this.initPostForm(response)
        };
      }
    );
  }

  initPostForm(user:User){
    this.postForm = this.formBuilder.group({
      idUser: [this.user.id],
      title: ['', Validators.required],
      mood: ['0', Validators.required],
      keywords: ['',[Validators.pattern('^[a-zA-Z0-9]*$')]],
      message: ['', Validators.required],
      imagePostUrl: ['']
    });
  }

  onValidatePost(){
    alert('Etes vous sur de vouloir poster votre message')

    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.userPseudoPost = this.user.pseudo;
    newPost.mood = this.postForm.get('mood').value;
    newPost.keywords = this.postForm.get('keywords').value;
    newPost.message = this.postForm.get('message').value;
    newPost.imagePostUrl = this.postForm.get('imagePostUrl').value;
    newPost.postDate = Date.now()

    this.postService.newPost(this.auth.getUserId(), newPost, newPost.imagePostUrl)
    .then(
      (response: { message: string }) => {
        this.postService.getAllPost()
        this.router.navigate(['/timeline']);
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
    this.router.navigate(['/timeline'])
    this.postService.getAllPost()
  }


  onFileUpload(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.get('imagePostUrl').setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUpload = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCancelPost(){
    alert('Etes vous sur d\'annuler votre message')
    this.router.navigate(['/timeline'])
  }

}
