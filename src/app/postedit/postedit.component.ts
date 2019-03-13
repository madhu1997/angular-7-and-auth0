import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.scss']
})
export class PosteditComponent implements OnInit {

  post: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ps: PostService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.angForm = this.fb.group({
        title: ['', Validators.required ],
        description: ['', Validators.required ],
      });
    }


  ngOnInit() {
    this.route.params.subscribe(params => {
        this.ps.editPost(params['id']).subscribe(res => {
          this.post = res;
      });
    });
  }
  updatePost(title, description) {
    this.route.params.subscribe(params => {
      this.ps.updatePost(title, description, params['id']);
      this.router.navigate(['post']);
    });
  }
}