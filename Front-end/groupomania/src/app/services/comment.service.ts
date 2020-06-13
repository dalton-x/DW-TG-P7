import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment$ = new Subject<Comment[]>();

  constructor(private http: HttpClient
              ) { }


  newComment(postId: string, commentData : Object) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/comment/create/'+postId, commentData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  getAllComments(postId: string){
    this.http.get('http://localhost:3000/api/comment/'+postId).subscribe(
      (comment: Comment[]) => {
        this.comment$.next(comment);
      },
      (error) => {
        this.comment$.next([]);
        console.error(error);
      }
    );
  }

  deleteComment(commentId : string){
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/comment/'+ commentId).subscribe(
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
