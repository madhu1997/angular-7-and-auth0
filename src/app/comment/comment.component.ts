import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommentService } from '../comment.service'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private cs: CommentService ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
     comment: ['', Validators.required ]
    });
  }
  addComment(comment) {
    this.cs.addComment(comment);
  }


  ngOnInit() {
  }

}
