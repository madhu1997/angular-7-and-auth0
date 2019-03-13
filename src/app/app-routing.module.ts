import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'
import { PostComponent } from './post/post.component';
import { PosteditComponent } from './postedit/postedit.component';
import { PostlistComponent } from './postlist/postlist.component';
import { CommentComponent } from './comment/comment.component';
import { CommenteditComponent } from './commentedit/commentedit.component';
import { CommentlistComponent } from './commentlist/commentlist.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'post', component: PostComponent},
  { path: 'postedit', component: PosteditComponent},
  { path: 'postlist', component: PostlistComponent},
  { path: 'comment', component: CommentComponent},
  { path: 'commentedit',component: CommenteditComponent },
  { path: 'commentlist', component: CommentlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
