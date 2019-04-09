import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    this.signupSV.signup(this.signUpForm);
  }

}
