import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public profilForm: FormGroup;
  user: User;
  imagePreview: string;
  uploadFile: File = null;
  fileName: string;
  fileLastModified: number;
  filetype: string;

  constructor(private authServ: AuthService,
              private formBuilder : FormBuilder,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.authServ.getCurrentUser(this.authServ.getUserId()).subscribe(      // récupération des informations de l'utilisateur
      (response: User) => {
        this.authServ.setCurrentUser(response);
        if (response !== undefined) {                                       // Si utilisateur OK
          this.user = response                                              // mise en variable des infos de l'utilisateur
          this.initForm(response)                                           // Init du Fomulaire
        };
      }
    );
  }

  // function pour initialisation du formulaire pour la mise a jour du profil
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


  // Function de recupération des informations du formulaire
  onUpdate(){
    const newUser = new User();
    newUser.firstname = this.profilForm.get('firstname').value;
    newUser.lastname = this.profilForm.get('lastname').value;
    newUser.pseudo = this.profilForm.get('pseudo').value;
    newUser.imageUrl = this.profilForm.get('imageUrl').value;

    this.authServ.update(this.authServ.getUserId(), newUser, newUser.imageUrl)            // Envoie des information vers le service
    .then(
      (response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/updateUser']);                                            // Renvoie vers la page de confirmation de l'update
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  // fonction pour la recuperation du fichier
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

  // Suppression du profil
  onDelete(){
    if (confirm("Etes vous sur de vouloir supprimé votre profil \n\n\n cette action est IRREVERSIBLE")){  // Confirmation pour la suppression du compte
      this.router.navigate(['/deleteUser']);
    }else{
      this.router.navigate(['/profil']);
    }
  }
}

