import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { disableBindings } from '@angular/core/src/render3';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  public post:any;

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
    this.route.params.subscribe(params => {
      this.cs.addComment(comment.value, params['id']);
      debugger;
    });
  }

  ngOnInit() {
  }
  }

