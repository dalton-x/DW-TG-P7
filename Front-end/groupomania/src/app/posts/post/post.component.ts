import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { Post } from '../../models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;
  user: User;
  post: Post;
  title: string;
  humeur: string;
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
      title: ['Votre titre', Validators.required],
      humeur: ['', Validators.required],
      keywords: ['Un mot clé'],
      message: ['Votre message', Validators.required],
      imagePostUrl: ['']
    });
  }

  onValidatePost(){
    alert('Etes vous sur de vouloir poster votre message')

    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.userPseudo = this.user.pseudo;
    newPost.humeur = this.postForm.get('humeur').value;
    newPost.keywords = this.postForm.get('keywords').value;
    newPost.message = this.postForm.get('message').value;
    newPost.imagePostUrl = this.postForm.get('imagePostUrl').value;

    this.postService.newPost(this.auth.getUserId(), newPost, newPost.imagePostUrl)
    .then(
      (response: { message: string }) => {
        this.router.navigate(['/timeline']);
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
    this.router.navigate(['/timeline'])
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
