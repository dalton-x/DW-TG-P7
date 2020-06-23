import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/Post.model';
import { FunctionsGlobalService } from 'src/app/services/functions-global.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  public searchFormKeyword: FormGroup;
  public searchFormUser: FormGroup;
  keywords: string;
  user: string;
  public posts: Post[];

  constructor(private postServ: PostService,
              private formBuilder: FormBuilder,
              public funcGlob: FunctionsGlobalService
              ) { }

  ngOnInit(): void {
    this.initForm()
  }

  // Initialisation du formulaire de recherche
  initForm(){
    this.searchFormKeyword = this.formBuilder.group({
      searchKeywords: ['', Validators.required]
    })
    this.searchFormUser = this.formBuilder.group({
      searchUser: ['', Validators.required]
    })
  }

  // Validation pour la recherche par mot clé
  onSearchKeyword(){
    this.keywords = this.searchFormKeyword.get('searchKeywords').value
    if (this.keywords){
      this.postServ.getPostByKeywords(this.keywords)
      .then(
        (Posts: Post[]) => {
        this.posts = Posts;
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Validation pour la recherche par Pseudo
  onSearchUser(){
    this.user = this.searchFormUser.get('searchUser').value
    if (this.user){
      this.postServ.getPostByUser(this.user)
      .then(
        (Posts: Post[]) => {
        this.posts = Posts;
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // réinnitialisation de la liste des resultats
  onCloseSearch(){
    this.posts = null
  }

  // Function pour un scroll "smooth" vers le post selectionner
  scrollOnPost(postId: string){
    document.querySelector("#post_" + postId).scrollIntoView({behavior: "smooth"});
  }
}
