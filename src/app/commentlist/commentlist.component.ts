import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.scss']
})
export class CommentlistComponent implements OnInit {

  comments: any = {};


  constructor( private route: ActivatedRoute,
    private router: Router,private cs: CommentService, private auth:AuthService) {
      auth.handleAuthentication();
      
      //debugger;
     }
     
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cs.getComments(params['id']).subscribe(res => {
        this.comments = res;
      });
  });
}
  deleteComment(id) {
    const postid: string =this.route.snapshot.params.id;
    this.route.params.subscribe(params => {
      this.cs.deleteComment(postid,id).subscribe(res => {
        console.log('Deleted');
      });
  });
}
}
