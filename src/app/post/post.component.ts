import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PostService } from '../post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: PostService ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
     title: ['', Validators.required ],
      description: ['', Validators.required ]
    });
  }
  addPost(title, description) {
    this.ps.addPost(title, description);
  }


  ngOnInit() {
  }

}

