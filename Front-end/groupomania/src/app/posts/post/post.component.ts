import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;
  imageUpload: string;

  constructor() { }

  ngOnInit(): void {
  }

  onFileUpload(event: Event){

  }

}
