import { Injectable } from '@angular/core';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  signup(user: User) {
    console.log("Signup information:");
    console.log("Name: " + user.name);
    console.log("Email: " + user.email);
    console.log("Email: " + user.password);
  }

  constructor() { }
}
