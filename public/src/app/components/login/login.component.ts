import {Router} from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/auth.service';
import {Component} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MyErrorStateMatcher} from '../../data/error.state.matcher';
import { CONST } from 'src/app/data/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService : AuthenticationService, private router : Router){}
  matcher = new MyErrorStateMatcher();
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
    
    //TEST
    localStorage.setItem(CONST.CURRENT_USER, JSON.stringify(CONST.USER_TEST));
    this.router.navigate(['user']);
    //END TEST
   
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
}