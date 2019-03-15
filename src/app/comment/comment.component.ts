import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  public post: string;

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private cs: CommentService,private ps : PostService,private route: ActivatedRoute ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
     comment: ['', Validators.required ]
    });
  }
  addComment(comment) {
    this.cs.addComment(comment.value);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.getPost(params['id']).subscribe(res => {
        this.post = res['_id'];
    });
  });
  }
  }

