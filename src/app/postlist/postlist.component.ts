import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';
import Post from '../post';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  posts: Post[];

  constructor(private ps: PostService, public auth: AuthService) { }

  ngOnInit() {
    this.ps
        .getPosts()
        .subscribe((data: Post[]) => {
          this.posts = data;
      });
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
  

}
