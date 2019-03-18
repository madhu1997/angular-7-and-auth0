import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.scss']
})
export class CommentlistComponent implements OnInit {

  comments: any = {};;

  constructor( private route: ActivatedRoute,
    private router: Router,private cs: CommentService, private auth:AuthService) {
      auth.handleAuthentication();
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cs.getComments(params['id']).subscribe(res => {
        this.comments = res;
      });
  });
}
  /*deleteComment(id) {
    this.cs.deleteComment(id).subscribe(res => {
      console.log('Deleted');
    });
  }*/
}
