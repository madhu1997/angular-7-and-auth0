import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import Post from '../post';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  posts: Post[];

  constructor(private ps: PostService) { }

  ngOnInit() {
    this.ps
        .getPosts()
        .subscribe((data: Post[]) => {
          this.posts = data;
      });
  }
  deletePost(id) {
    this.ps.deletePost(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
