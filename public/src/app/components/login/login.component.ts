import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailInput : String;
  user : any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { 

  }

  logInForm = new FormGroup({
    email    : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.emailInput = "youremail@example.com";
  }
  
  onSubmit(){
    this.user = this.logInForm.value;
    console.log(this.user)
    this.authService.login(this.user).subscribe(data => {
      console.log(data)
      if(data.status == 'success'){
        if(data.user.isAdmin){
          console.log(data)
          setTimeout(() => {
            this.router.navigate(['user']); // Navigate to dashboard view
          }, 750);
        } else {
          console.log(data)
          setTimeout(() => {
            this.router.navigate(['']); // Navigate to dashboard view
          }, 750);
        }
      } else {
        console.log(data.message)
      }
    })
  }
}