import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser : any;
  emailInput : String;
  constructor(private signupSV : SignupService) { }

  signUpForm = new FormGroup({
    name     : new FormControl("", Validators.required),
    email    : new FormControl("", Validators.required),
    password1 : new FormControl("", Validators.required),
    password2 : new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.emailInput = "youremail@example.com";
  }
  
  onSubmit(){
    this.newUser = this.signUpForm.value;
    if(this.newUser.password1 != this.newUser.password2){
      console.log("Password not match");
      return false;
    }
    this.newUser.password = this.newUser.password1;
    this.signupSV.signup(this.newUser);
  }

}
