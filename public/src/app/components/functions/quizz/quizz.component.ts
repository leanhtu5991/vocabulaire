import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { User } from 'src/app/data/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  userId : number;
  constructor(private authenticationService : AuthenticationService, private router : Router){ 
    this.authenticationService.profile().subscribe(data => {
      console.log(data)
      this.userId = data.id
    }) 
  }

  ngOnInit(){

  }

  startQuizz(){
    this.router.navigate(['/quizzDetail']);
  }

}
