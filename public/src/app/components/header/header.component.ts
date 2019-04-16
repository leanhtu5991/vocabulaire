import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged : boolean;
  constructor(
    private authService: AuthenticationService
  ) 
  { 
  }

  ngOnInit() {
    this.isLogged = true;
  }
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
