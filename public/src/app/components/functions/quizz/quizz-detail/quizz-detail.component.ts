import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import { MatCardModule, MatRadioModule, MatDividerModule, MatDialog, MatProgressBarModule } from '@angular/material';
import { QCMResponse, QuestionQCM } from 'src/app/data/question';
import { QuestionResult } from 'src/app/data/question';
import { QuizzResultComponent } from '../../../pop-up/quizz-result/quizz-result.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { WordService } from 'src/app/services/word.service';
import { CONST } from '../../../../data/global';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

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
  typeQuestion: number;
  answer : any;
  sugestion: any = '';
  finish_answer:  any= false;
  lstWord: any;
  detailWord: any;
  img_correct = '../../../../assets/img/bravo.jpg';
  img_incorrect = '../../../../assets/img/sad.png'
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
      };
      this.detailWord = {
        word: "",
        translate : "",
        example1: "",
        example2: "",
        box : ""
      }
    }

  ngOnInit() {
    var results = [];
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id;
      this.quizzService.getWordValidateTime(this.userId).subscribe(data => {
        this.lstQuestion = [];
        this.lstWord = [];
          data.forEach(word=>{
            var detailWord = {
              word: word.word,
              translate : word.translate,
              example1: word.example1,
              example2: word.example2,
              box: word.idbox
            }
            this.lstWord.push(detailWord);
          // lstWord.forEach(word=> {
            this.typeQuestion = Math.floor(Math.random() * 1);
            var direction = Math.floor(Math.random() * 2); 
            var answer = Math.floor(Math.random() * 4); 
            var choice=[];
            var options=[this.optionA, this.question.optionB, this.optionC, this.optionD];
            var s;
            // If form of this question is QCM
            if(this.typeQuestion == 0){
              // If translate english => other
              if(direction == 0){
                let wordId = word.id;
                let ask = "What is the definition of " + word.word + " ?";
                for(var i=0; i<4; i++){
                  if(i==answer){
                    choice.push(word.translate);
                    s = options[i]
                  } else {
                    choice.push('aaa')
                  }
                }
                let q = new QuestionQCM(wordId, ask,this.typeQuestion, choice[0], choice[1], choice[2], choice[3], s);
                this.lstQuestion.push(q)
              // Iftranslate other => english
              } else if (direction==1){
                let wordId = word.id;
                let ask = "La définition du mot '" + word.translate + "' ?";
                for(var i=0; i<4; i++){
                  if(i==answer){
                    choice.push(word.word);
                    s = options[i]
                  } else {
                    choice.push('aaa')
                  }
                }
                let q = new QuestionQCM(wordId, ask, this.typeQuestion, choice[0], choice[1], choice[2], choice[3], s);
                this.lstQuestion.push(q)
              }
            } else if(this.typeQuestion == 1){
                if(direction == 0){
                  let wordId = word.id;
                  let ask = "What is the definition of " + word.word + " ?";
                  var q = {
                    wordId : wordId,
                    ask : ask,
                    solution: word.translate.toLowerCase(), 
                    type : this.typeQuestion,
                    sugestion: this.randomString(word.translate)
                  }
                  this.lstQuestion.push(q)
                } else if (direction == 1){
                  let wordId = word.id;
                  let ask = "La définition du mot '" + word.translate + "' ?";
                  q = {
                    wordId : wordId,
                    ask : ask,
                    solution: word.word.toLowerCase(),
                    type:this.typeQuestion,
                    sugestion: this.randomString(word.word)
                  }
                  this.lstQuestion.push(q)
              }
          }
          this.question = this.lstQuestion[this.indexQuestion];
          this.nbQuestion = this.lstQuestion.length;
          this.detailWord = this.lstWord[this.indexQuestion]
        })
      })
    })
  }

  // Random letter of a string
  randomString(item){
    var suggestion = "";
    var indexSuggestion = [];
    for(var i=0; i<item.length; i++){
      var random = Math.floor(Math.random() * item.length); 
      if(indexSuggestion == null){
        indexSuggestion.push(random)
      } else {
        while(indexSuggestion.includes(random)){
          random = Math.floor(Math.random() * item.length); 
        }
        indexSuggestion.push(random)
      }    
      suggestion = suggestion+item.charAt(random).toUpperCase();
    }
    return suggestion;
  }

  // When you choose an anwser
  onSelect(event, option){
    this.resetForm();
    if(option == this.selected){
      this.selected = null;
    } else {
      this.selected = option;
      event.target.style.color = "red";
      event.target.style.fontSize = "20px";  
    }
  }

  // if question is qcm
  submit(){
    this.question.answer = this.selected;
    var wordId = this.lstQuestion[this.indexQuestion].wordId;
    if(this.question.answer === this.question.solution){
      this.lstQuestion[this.indexQuestion].result = QuestionResult.CORRECT;
      this.totalTrue++;
      this.score += 10;
      $(".option."+this.question.solution).addClass("correct");
      this.finish_answer = true;
    } else {
      this.lstQuestion[this.indexQuestion].result = QuestionResult.INCORRECT;
      $(".option."+this.question.answer).addClass("incorrect");
      $(".option."+this.question.solution).addClass("correct");
      this.finish_answer = true;
    }
    var result = this.lstQuestion[this.indexQuestion].result;
    this.wordService.updateStatutWord(wordId, result).subscribe(data => {
      localStorage.removeItem(CONST.KEY_LISTWORD);
      this.wordService.getListWord(this.userId).subscribe(datas => {
        let lstWord = datas;
        localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
      })  
    }) 
    // this.nextQuestion();
  }

  // if complete a question
  submit1(){
    var answer = this.answer.trim().toLowerCase();
    this.finish_answer = true;
    this.selected = answer;
    for(var i=0; i<answer.length; i++){
      if(answer[i]==answer[i+1] && answer[i]==" ") {
      } 
    }
    var wordId = this.lstQuestion[this.indexQuestion].wordId;
    if(answer == this.question.solution){
      this.lstQuestion[this.indexQuestion].result = QuestionResult.CORRECT;
      this.totalTrue++;
      this.score += 10;
    } else {
      this.lstQuestion[this.indexQuestion].result = QuestionResult.INCORRECT;
    }
    var result = this.lstQuestion[this.indexQuestion].result;
    this.wordService.updateStatutWord(wordId, result).subscribe(data => {
      localStorage.removeItem(CONST.KEY_LISTWORD);
      this.wordService.getListWord(this.userId).subscribe(datas => {
        let lstWord = datas;
        localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
      })  
    }) 
  }

  nextQuestion(){
    this.resetForm();
    this.finish_answer = false;
    this.selected = null;
    this.answer = "";
    $("#suggestion").empty();
    $(".option").each(function() {
      $(this).removeClass("correct");
      $(this).removeClass("incorrect");
    });
    this.timing = 0;
    if(this.indexQuestion + 1 == this.nbQuestion){
      this.showResult();
    } else {
      this.indexQuestion += 1;
      this.question = this.lstQuestion[this.indexQuestion];
      this.detailWord = this.lstWord[this.indexQuestion];
      if(this.indexQuestion + 1 == this.nbQuestion){
        this.buttonLabel = "Finish Test";
      }
    }
    this.timing = 0;
  }

  suggest1(){
    $("#suggestion").empty();
    var sugestion = this.question.solution;
    for(var i=0; i<sugestion.length; i++){
      if(i==0){
        $("#suggestion").append("<span style='margin-left: 3px; margin-right: 3px; border-bottom: 2px solid black'>"+sugestion[i].toUpperCase()+"</span>");
      } else {
        $("#suggestion").append("<span style='margin-left: 3px; margin-right: 3px; border-bottom: 2px solid black'>?</span>");
      }
    }
  }

  suggest2(){
    $("#suggestion").empty();
    var sugestion = this.question.sugestion;
    for(var i=0; i<sugestion.length; i++){
      $("#suggestion").append("<span style='margin-left: 3px; margin-right: 3px; border-bottom: 2px solid black'>"+sugestion[i]+"</span>");
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
