import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comment.service';
@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {
  post: any = {};
  postId: string;
  constructor(private auth: AuthService, private router: Router,private ps: PostService,private route: ActivatedRoute,private cs: CommentService) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.getPost(params['id']).subscribe(res => {
        this.post = res;
        //debugger;
    });
  });
  }

  deletePost(id) {
    this.ps.deletePost(id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['post']);
    });
  }
  /*deleteComment(id) {
    this.cs.deleteComment(id).subscribe(res => {
      console.log('Deleted');
    });
  }
  /*public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }*/


}
