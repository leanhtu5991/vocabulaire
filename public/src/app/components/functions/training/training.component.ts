import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/data/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CONST } from 'src/app/data/global';
import * as $ from 'jquery';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  lstWord;
  lstBox = CONST.CONFIG_BOX;
  selectedWord : any;
  userId;
  lstTrainingWord;
  img_training = '../../../assets/img/training.jpg';
  show_result = false;
  result_final : any;
  wordTrainingLength: any;
  constructor(private serviceWord : WordService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id
      this.serviceWord.getListWord(this.userId).subscribe(datas => {
        this.lstWord = datas;
        if(localStorage.getItem(CONST.KEY_LISTWORD) === null || localStorage.getItem(CONST.KEY_LISTWORD) == null){
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        } else {
          localStorage.removeItem(CONST.KEY_LISTWORD)
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        }
        this.randomWord(this.lstWord)
      })  
    })
    

  }

  randomWord(lstword){
    var tableWordTraining = [];
    this.wordTrainingLength = 20;
    this.lstTrainingWord = [];
    if(lstword.length<20){
      this.wordTrainingLength = lstword.length;
    }
    for(var i=0; i<this.wordTrainingLength; i++){
      var random = Math.floor(Math.random() * lstword.length); 
      var x = Math.floor(Math.random() * 2);
      if(tableWordTraining == null){
        tableWordTraining.push(random);
        this.lstTrainingWord.push(lstword[random]);
        lstword[random].direction = x;
        lstword[random].answer = "";
      }
      else {
        while(tableWordTraining.includes(random)){
          random = Math.floor(Math.random() * lstword.length); 
        }
        tableWordTraining.push(random)
        lstword[random].direction = x;
        lstword[random].answer = "";
        this.lstTrainingWord.push(lstword[random])
      }
    }
  }

  showResult(){
    this.show_result = true;
    this.result_final = 0;
    for(var i=0; i<this.lstTrainingWord.length; i++){
      if(this.lstTrainingWord[i].direction == 0){
        if(this.lstTrainingWord[i].translate.toLowerCase() == this.lstTrainingWord[i].answer.toLowerCase()){
          this.lstTrainingWord[i].result = true;
          this.result_final +=1;
        } else {
          this.lstTrainingWord[i].result = false;
        }
      } else {
        if(this.lstTrainingWord[i].word.toLowerCase() == this.lstTrainingWord[i].answer.toLowerCase()){
          this.lstTrainingWord[i].result = true;
          this.result_final +=1;
        } else {
          this.lstTrainingWord[i].result = false;
        }
      }
      
    }
  }

  resetTraining(){
    this.randomWord(this.lstWord);
    this.show_result = false;
  }

}
