import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  //uri = 'http://localhost:4000/post/:id/comment';

  constructor(private http: HttpClient) { }


  addComment(comment,postId) {
    debugger;
    const obj = {
     comment: comment
    };
    this.http.post(`http://localhost:4000/post/${postId}/comment/add`, obj)
        .subscribe(res => console.log('Done'));
  }
  getComments(postId) {
    return this
           .http
           .get(`http://localhost:4000/post/${postId}/comment`);
  }
  editComment(postId,id) {
    debugger;
    return this
            .http
            .get(`http://localhost:4000/post/${postId}/comment/edit/${id}`);
            
    }
  updateComment(comment,postId, id) {

    const obj = {
        comment: comment
      };
    this
      .http
      .post(`http://localhost:4000/post/${postId}/comment/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
  deleteComment(postId,id) {
    return this
              .http
              .get(`http://localhost:4000/post/${postId}/comment/delete/${id}`);
  }
}