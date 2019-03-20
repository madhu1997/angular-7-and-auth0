import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import Post from '../post';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.scss']
})
export class MypostComponent implements OnInit {

  posts: Post[];

  constructor(private ps: PostService, public auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.ps
        .userPosts()
        .subscribe((data: Post[]) => {
          this.posts = data;
      });
  }
  deletePost(id) {
    this.ps.deletePost(id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['']);
    });
  }

}
