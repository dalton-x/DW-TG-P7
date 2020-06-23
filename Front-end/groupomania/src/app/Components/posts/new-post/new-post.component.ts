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
    private authServ: AuthService,
    private postServ: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authServ.getCurrentUser(this.authServ.getUserId()).subscribe(    // Récuperation des information du l'utilisateur
      (response: User) => {
        this.authServ.setCurrentUser(response);
        if (response !== undefined) {                                     // si utilisateur OK
          this.user = response                                            // Information de l'utilisateur mise adans une variable
          this.initPostForm(response)                                     // Init de la function du formaulaire
        };
      }
    );
  }

  // Initialisation du formaulaire du creation du post
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

  // Validation du post
  onValidatePost(){
    if (confirm('Etes vous sur de vouloir poster votre message')){        // validation du post avec une alerte pour confirmé le post
      const newPost = new Post();
      newPost.title = this.postForm.get('title').value;
      newPost.userPseudoPost = this.user.pseudo;
      newPost.mood = this.postForm.get('mood').value;
      newPost.keywords = this.postForm.get('keywords').value;
      newPost.message = this.postForm.get('message').value;
      newPost.imagePostUrl = this.postForm.get('imagePostUrl').value;
      newPost.postDate = Date.now()

      this.postServ.newPost(this.authServ.getUserId(), newPost, newPost.imagePostUrl)     // Envoie des informations du nouveau post vers le service
      .then(
        (response: { message: string }) => {
          this.postServ.getAllPost()
          this.router.navigate(['/timeline']);
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
      this.router.navigate(['/timeline'])                                 // renvoie si OK vers la timeline
      this.postServ.getAllPost()                                          // refresh des posts
    }
  }


  // fonction pour la recuperation du fichier
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

  // function pour annulation du post et retour vers timeline
  onCancelPost(){
    alert('Etes vous sur d\'annuler votre message')
    this.router.navigate(['/timeline'])
  }

}
