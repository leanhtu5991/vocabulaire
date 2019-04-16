import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/data/user';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser : any;
  emailInput : String;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) 
  {
    this.emailInput = "youremail@example.com";
  }

  signUpForm = new FormGroup({
    name     : new FormControl("", Validators.required),
    email    : new FormControl("", Validators.required),
    password1 : new FormControl("", Validators.required),
    password2 : new FormControl("", Validators.required)
  });

  ngOnInit() {
    
  }
  
  onSubmit(){
    this.newUser = this.signUpForm.value;
    if(this.newUser.password1 != this.newUser.password2){
      console.log("Password not match");
      return false;
    }
    this.newUser.password = this.newUser.password1;
    this.newUser.civil = 1;
    this.newUser.tel = "123456";
    this.newUser.birthday = null;
    console.log(this.newUser)
    this.authService.register(this.newUser).subscribe(data => {
      console.log(data)
    })
  }

}
