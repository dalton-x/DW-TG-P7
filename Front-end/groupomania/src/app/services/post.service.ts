import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from '../models/Post.model';
import { Subject } from 'rxjs';
import { FunctionsGlobalService } from './functions-global.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  post$ = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private func :FunctionsGlobalService
  ) { }

  newPost(id: string, postData : Object, image: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.post('http://localhost:3000/api/post/create/'+id, postData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('post', JSON.stringify(postData));
        formData.append('image', image);
        this.http.post('http://localhost:3000/api/post/create/'+id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  getPostByKeywords(keywords) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post/keyword/'+keywords).subscribe(
        (posts: Post) => {
          resolve(posts);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getPostByUser(user) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post/user/'+user).subscribe(
        (posts: Post) => {
          resolve(posts);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllPost() {
    this.http.get('http://localhost:3000/api/post/').subscribe(
      (post: Post[]) => {
          this.post$.next(post);
      },
      (error) => {
        this.post$.next([]);
        console.error(error);
      }
    );
  }

  deletePost(postId : string){
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/post/'+ postId).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
