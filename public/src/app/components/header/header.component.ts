import { Component, OnInit, Input, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { User } from 'src/app/data/user';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService, private render:Renderer){}

  ngOnInit() {
    
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
  
  public menuClick(event){
    $(".header-menu").find('li').each(function() {
      $(this).removeClass("active")
    })
    console.log(event.target.parentNode)
    this.render.setElementClass(event.target.parentNode,"active",true);
    
  }
}
