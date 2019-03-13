import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  uri = 'http://localhost:4000/comment';

  constructor(private http: HttpClient) { }

  addComment(comment) {
    const obj = {
     comment: comment
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}