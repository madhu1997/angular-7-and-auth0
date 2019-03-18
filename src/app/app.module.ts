import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { PosteditComponent } from './postedit/postedit.component';
import { PostlistComponent } from './postlist/postlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';
import { PostviewComponent } from './postview/postview.component';
import { CommentComponent } from './comment/comment.component';
import { CommenteditComponent } from './commentedit/commentedit.component';
import { CommentlistComponent } from './commentlist/commentlist.component';
import { CommentService } from './comment.service';
import { CommentviewComponent } from './commentview/commentview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    PostComponent,
    PosteditComponent,
    PostlistComponent,
    PostviewComponent,
    CommentComponent,
    CommenteditComponent,
    CommentlistComponent,
    CommentviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [AuthService,PostService,CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
