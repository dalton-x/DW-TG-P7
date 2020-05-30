import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public profilForm: FormGroup
  user: User;
  imagePreview: string;
  uploadFile: File = null;
  fileName: string
  fileLastModified: number
  filetype: string

  constructor(private auth: AuthService,
              private formBuilder : FormBuilder,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.auth.getCurrentUser(this.auth.getUserId()).subscribe(
      (response: User) => {
        this.auth.setCurrentUser(response);
        if (response !== undefined) {
          this.user = response
          this.initForm(response)
        };
      }
    );
  }

  initForm(user:User){
    this.profilForm = this.formBuilder.group({
      id: [this.user.id],
      lastname: [this.user.lastname, Validators.required],
      firstname: [this.user.firstname, Validators.required],
      pseudo: [this.user.pseudo, Validators.required],
      imageUrl: [this.user.imageUrl]
    });
    this.imagePreview = this.user.imageUrl;
  }

  onUpdate(){
    const newUser = new User();
    newUser.firstname = this.profilForm.get('firstname').value;
    newUser.lastname = this.profilForm.get('lastname').value;
    newUser.pseudo = this.profilForm.get('pseudo').value;
    newUser.imageUrl = this.profilForm.get('imageUrl').value;

    this.auth.update(this.auth.getUserId(), newUser, newUser.imageUrl)
    .then(
      (response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/updateUser']);
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  onFileAdded(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.profilForm.get('imageUrl').setValue(file);
    this.profilForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDelete(){
    if (confirm("Etes vous sur de vouloir supprimé votre profil \n\n\n cette acction est IRREVERSIBLE")){
      this.router.navigate(['/deleteUser']);
    }
  }
}

