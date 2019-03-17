import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  uri = 'http://localhost:4000/post';
  
  constructor(private http: HttpClient, private auth: AuthService) { }
  test = this.auth.isAuthenticated();
  
  addPost(title,description) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    const obj = {
      title: title,
      description: description
    };
    if (this.auth.isAuthenticated()) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.auth.accessToken
        })
      };
    }
    
    this.http.post(`${this.uri}/add`, obj, httpOptions)
    .subscribe(res => console.log('Done'));
  }
  
  getPosts() {
    return this
    .http
    .get(`${this.uri}`);
  }
  getPost(id) {
    return this
    .http
    .get(`${this.uri}/get/${id}`);
  }
  editPost(id) {
    return this
    .http
    .get(`${this.uri}/edit/${id}`);
  }
  updatePost(title, description, id) {
    
    const obj = {
      title: title,
      description: description
    };
    console.log(obj);
    debugger;
    this
    .http
    .post(`${this.uri}/update/${id}`, obj)
    .subscribe(res => console.log('Done'));
  }
  
  deletePost(id) {
    return this
    .http
    .get(`${this.uri}/delete/${id}`);
  }
  
}
