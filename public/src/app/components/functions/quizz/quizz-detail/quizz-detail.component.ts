import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import { MatCardModule, MatRadioModule, MatDividerModule, MatDialog } from '@angular/material';
import { QCMResponse } from 'src/app/data/question';
import { QuestionResult } from 'src/app/data/question';
import { QuizzResultComponent } from '../../../pop-up/quizz-result/quizz-result.component';

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

  constructor(private route: ActivatedRoute, private quizzService : QuizzService, private dialog : MatDialog, private router : Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    console.log("Create question base for user id " + this.userId);
    this.lstQuestion = this.quizzService.createListQuestion(this.userId);
    this.nbQuestion = this.lstQuestion.length;
    this.question = this.lstQuestion[this.indexQuestion];
    console.log("Created " + this.nbQuestion + " questions");
  }

  onSelect(event, option){
    this.resetForm();
    if(option == this.selected){
      this.selected = null;
    } else {
      this.selected = option;
      event.target.style.color = "red";
      event.target.style.fontSize = "20px";  
    }
    this.question.answer = this.selected;
  }

  submit(){
    this.resetForm();
    this.selected = null;
    if(this.question.answer === this.question.solution){
      this.lstQuestion[this.indexQuestion].result = QuestionResult.CORRECT;
      this.totalTrue++;
      this.score += 10;
    } else {
      this.lstQuestion[this.indexQuestion].result = QuestionResult.INCORRECT;
    }
    this.indexQuestion += 1;
    if(this.indexQuestion == this.nbQuestion){
      console.log("Finished");
      console.log(this.lstQuestion);
      this.showResult();
    } else {
      this.question = this.lstQuestion[this.indexQuestion];
      if(this.indexQuestion == this.nbQuestion - 1){
        this.buttonLabel = "Finish Test";
      }
    }
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
