import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';


@Component({
  selector: 'app-commentlist',
  templateUrl: './commentlist.component.html',
  styleUrls: ['./commentlist.component.scss']
})
export class CommentlistComponent implements OnInit {

  comments: Comment[];

  constructor(private ps: CommentService) { }

  ngOnInit() {
    this.ps
        .getComments()
        .subscribe((data: Comment[]) => {
          this.comments = data;
      });
  }
}
