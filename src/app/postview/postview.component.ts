import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comment.service';
import { CommenteditComponent } from '../commentedit/commentedit.component';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {
  post: any = {};
  constructor(private auth: AuthService ,private ps: PostService,private route: ActivatedRoute,private cs: CommentService ) { 
    auth.handleAuthentication();

  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.getPost(params['id']).subscribe(res => {
        this.post = res;
        //this.cs.addComment(this.post._id);
        //console.log(this.post._id);
    });
  });
  
    
  }
  
  //debugger;
  }
  