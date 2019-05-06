import {Router} from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/auth.service';
import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService : AuthenticationService, private router : Router){}

  emailInput = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordInput = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  loginForm = new FormGroup({
    email    : this.emailInput,
    password : this.passwordInput
  });

  user : any;

  onSubmit(){
    this.user = this.loginForm.value;
    console.log(this.user);
    this.router.navigate(['user']);
    this.authService.login(this.user).subscribe(data => {
      console.log(data);
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
        console.log(data.message);
      }
    })
  }

  matcher = new MyErrorStateMatcher();
}