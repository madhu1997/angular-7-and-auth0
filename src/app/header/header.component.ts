import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
   }

  ngOnInit() {
}
}
