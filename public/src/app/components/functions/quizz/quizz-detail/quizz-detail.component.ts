import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import { MatCardModule, MatRadioModule, MatDividerModule } from '@angular/material';
import { responseQCM } from 'src/app/data/question';

@Component({
  selector: 'app-quizz-detail',
  templateUrl: './quizz-detail.component.html',
  styleUrls: ['./quizz-detail.component.css']
})
export class QuizzDetailComponent implements OnInit {
  userId : any;
  lstQuestion : any;
  nbQuestion : any;
  question : any;
  nbQ : number = 1;
  selected : responseQCM;

  optionA : any = responseQCM.optionA;
  optionB : any = responseQCM.optionB;
  optionC : any = responseQCM.optionC;
  optionD : any = responseQCM.optionD;

  constructor(private route: ActivatedRoute, private quizzService : QuizzService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    console.log("Create question base for user id " + this.userId);
    this.lstQuestion = this.quizzService.createListQuestion(this.userId);
    this.nbQuestion = this.lstQuestion.length;
    this.question = this.lstQuestion[0];
    console.log("Created " + this.nbQuestion + " questions");
  }

  onSelect(event, option){
    let options = document.getElementsByClassName("option") as HTMLCollectionOf<HTMLElement>;;
    for(var i = 0; i < options.length; i++)
    {
     options[i].style.color = '';
     options[i].style.fontSize = '';
    }
    if(option == this.selected){
      this.selected = null;
      return;
    }
    this.selected = option;
    event.target.style.color = "red";
    event.target.style.fontSize = "20px";  
  }

  submit(){
    
  }

}
