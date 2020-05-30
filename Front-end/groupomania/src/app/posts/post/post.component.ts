import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { compilePipeFromMetadata } from '@angular/compiler';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postForm: FormGroup;
  imageUpload: string;
  user: User;
  post: Post;

  constructor(
    private auth: AuthService,
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
      id: [this.user.id],
      title: ['Votre titre', Validators.required],
      humeur: ['', Validators.required],
      keywords: ['Un mot clé'],
      message: ['Votre message', Validators.required],
      imagePostUrl: ['']
    });
    this.imageUpload = '';
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

  onValidatePost(){
    alert('etes vous sur de vouloir poster votre message')
    console.log("this.postForm",this.postForm)
    this.router.navigate(['/timeline'])
  }

  onCancelPost(){
    alert('etes vous sur d\'annuler votre message')
    this.router.navigate(['/timeline'])
  }

}
