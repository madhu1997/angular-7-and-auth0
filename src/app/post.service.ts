import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri = 'http://localhost:4000/post';

  constructor(private http: HttpClient) { }

  addPost(title,description) {
    const obj = {
      title: title,
      description: description
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
