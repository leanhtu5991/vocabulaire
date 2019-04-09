import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  signup(signUpForm: FormGroup) {
    console.log("Signup information:");
    console.log("Name: " + signUpForm.controls['name'].value);
    console.log("Email: " + signUpForm.controls['email'].value);
  }

  constructor() { }
}
