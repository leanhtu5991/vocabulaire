import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import { MatCardModule, MatRadioModule, MatDividerModule, MatDialog, MatProgressBarModule } from '@angular/material';
import { QCMResponse } from 'src/app/data/question';
import { QuestionResult } from 'src/app/data/question';
import { QuizzResultComponent } from '../../../pop-up/quizz-result/quizz-result.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { WordService } from 'src/app/services/word.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-quizz-detail',
  templateUrl: './quizz-detail.component.html',
  styleUrls: ['./quizz-detail.component.css']
})
export class QuizzDetailComponent implements OnInit {
  userId : any;
  lstQuestion : any;
  nbQuestion : any;
  totalTrue = 0;
  score = 0;
  question : any;
  selected : QCMResponse;
  indexQuestion = 0;
  buttonLabel = "Next question";
  optionA : any = QCMResponse.optionA;
  optionB : any = QCMResponse.optionB;
  optionC : any = QCMResponse.optionC;
  optionD : any = QCMResponse.optionD;
  timing : number = 0;

  constructor(private authenticationService : AuthenticationService, 
    private wordService : WordService,
    private route: ActivatedRoute, private quizzService : QuizzService, private dialog : MatDialog, private router : Router) { 
      this.question = {
        ask: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        solution: "",
        type: 0
      }
    }

  ngOnInit() {
    var results = [];
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id;
      this.lstQuestion = this.quizzService.createListQuestion(this.userId);
      console.log('lst Q', this.lstQuestion)
      this.question = this.lstQuestion[this.indexQuestion];
      console.log('question', this.question);
      // var result = {
      //   idWord : 
      // }
      // console.log('question', this.lstQuestion[this.indexQuestion])
      
      this.nbQuestion = this.lstQuestion.length;
      // this.question = this.lstQuestion[this.indexQuestion];
    })


  }

  onSelect(event, option){
    this.resetForm();
    if(option == this.selected){
      //Unselect selected option:
      this.selected = null;
    } else {
      this.selected = option;
      event.target.style.color = "red";
      event.target.style.fontSize = "20px";  
    }
  }

  submit(){
    this.question.answer = this.selected;
    var wordId = this.lstQuestion[this.indexQuestion].wordId;
   
    if(this.question.answer === this.question.solution){
      this.lstQuestion[this.indexQuestion].result = QuestionResult.CORRECT;
      this.totalTrue++;
      this.score += 10;
      console.log('correct',QuestionResult.CORRECT)
    } else {
      this.lstQuestion[this.indexQuestion].result = QuestionResult.INCORRECT;
    }
    var result = this.lstQuestion[this.indexQuestion].result;
    this.wordService.updateStatutWord(wordId, result).subscribe(data => {
      console.log(data)
    }) 
    this.nextQuestion();
  }

  nextQuestion(){
    this.resetForm();
    this.selected = null;
    this.timing = 0;
    if(this.indexQuestion + 1 == this.nbQuestion){
      console.log("Finished");
      console.log(this.lstQuestion);
      this.showResult();
    } else {
      this.indexQuestion += 1;
      this.question = this.lstQuestion[this.indexQuestion];
      if(this.indexQuestion + 1 == this.nbQuestion){
        this.buttonLabel = "Finish Test";
      }
    }
    this.timing = 0;
  }

  resetForm(){
    let options = document.getElementsByClassName("option") as HTMLCollectionOf<HTMLElement>;;
    for(var i = 0; i < options.length; i++)
    {
     options[i].style.color = '';
     options[i].style.fontSize = '';
    }
  }

  public showResult() : void {
    const dialogRef = this.dialog.open(QuizzResultComponent, {
      data: { 
        score: this.score,
        totalQuestion : this.nbQuestion,
        totalTrue : this.totalTrue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['user']);
    });
  }

}
