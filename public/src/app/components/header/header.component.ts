import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService){}

  ngOnInit() {}
  
  public logout(){
    this.authService.logout();
  }
  public isAdmin(){
    return this.authService.isAdmin();
  }
  public isLogedIn() {
    return this.authService.loggedIn();
  }
}
