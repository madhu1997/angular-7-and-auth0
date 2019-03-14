import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../post';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {
  post: any = {};
  
  constructor(private router: Router,private ps: PostService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.getPost(params['id']).subscribe(res => {
        this.post = res;
    });
  });
  }
  deletePost(id) {
    this.ps.deletePost(id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['post']);
    });
  }

}
