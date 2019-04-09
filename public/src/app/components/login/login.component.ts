import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailInput : String;
  constructor(private loginSV : LoginService) { }

  logInForm = new FormGroup({
    email    : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.emailInput = "youremail@example.com";
  }
  
  onSubmit(){
    this.loginSV.login(this.logInForm.controls['email'].value,this.logInForm.controls['password'].value);
  }
}