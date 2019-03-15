import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'
import { PostComponent } from './post/post.component';
import { PosteditComponent } from './postedit/postedit.component';
import { PostlistComponent } from './postlist/postlist.component';
import { CommentComponent } from './comment/comment.component';
import { CommenteditComponent } from './commentedit/commentedit.component';
import { CommentlistComponent } from './commentlist/commentlist.component';
import { PostviewComponent } from './postview/postview.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'post/create', component: PostComponent},
  { path: 'post/edit/:id', component: PosteditComponent},
  { path: 'post', component: PostlistComponent},
  { path: 'post/:id/comment/create', component: CommentComponent},
  { path: 'comment/edit/:id',component: CommenteditComponent },
  { path: 'comment', component: CommentlistComponent },
  { path: 'post/get/:id', component : PostviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
