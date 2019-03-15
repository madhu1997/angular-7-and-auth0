import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-commentedit',
  templateUrl: './commentedit.component.html',
  styleUrls: ['./commentedit.component.scss']
})
export class CommenteditComponent implements OnInit {

  comment: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cs: CommentService,
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
        this.cs.editComment(params['id']).subscribe(res => {
          this.comment = res;
      });
    });
  }
  updateComment(comment) {
    this.route.params.subscribe(params => {
      this.cs.updateComment(comment, params['id']);
      this.router.navigate(['comment']);
    });
  }
}
