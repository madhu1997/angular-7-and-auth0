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
import { MypostComponent } from './mypost/mypost.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'post/create', component: PostComponent},
  { path: 'post/edit/:id', component: PosteditComponent},
  { path: '', component: PostlistComponent},
  { path: 'post/:id/comment/create', component: CommentComponent},
  { path: 'post/:id/comment/edit/:id',component: CommenteditComponent },
  { path: 'post/:id/comment', component: CommentlistComponent },
  { path: 'post/:id', component : PostviewComponent },
  { path: 'mypost', component : MypostComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
