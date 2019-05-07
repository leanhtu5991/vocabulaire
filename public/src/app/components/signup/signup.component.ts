import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/auth.service';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  newUser : any;
  confirmPasswordMatch: boolean = true;
  nameInput = new FormControl('', [
    Validators.required
  ]);

  emailInput = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  password1Input = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  password2Input = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  signupForm = new FormGroup({
    name      : this.nameInput,
    email    : this.emailInput,
    password1 : this.password1Input,
    password2 : this.password2Input
  });

  user : any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) 
  {}

  ngOnInit() {
    
  }
  
  onSubmit(){
    this.newUser = this.signupForm.value;
    this.newUser.password = this.newUser.password1;
    this.newUser.civil = 1;
    this.newUser.tel = "123456";
    this.newUser.birthday = null;
    console.log(this.newUser)
    this.authService.register(this.newUser).subscribe(data => {
      console.log(data)
    })
  }

  checkConfirmPassword(e){
    this.confirmPasswordMatch = (e.target.value == this.password1Input.value);
  }
}