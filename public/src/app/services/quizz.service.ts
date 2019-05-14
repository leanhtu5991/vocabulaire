import { Injectable } from '@angular/core';
import { QuestionQCM, QCMResponse } from '../data/question';
import { WordService } from './word.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(public wordService : WordService) {
    
   }

  createListQuestion(userid : number){
    console.log("SV Quizz start");
    let lstWord = this.wordService.getCurrentWordList();
    let lstQuestion = [];
    lstWord.forEach(function(word) {
      let ask = "What is the definition of " + word.word + " ?";
      let oA = word.translate;
      let oB = "BBB";
      let oC = "CCC";
      let oD = "DDD";
      let s  = QCMResponse.optionA;
      let q = new QuestionQCM(ask, oA, oB, oC, oD, s);
      lstQuestion.push(q);
    });
    return lstQuestion;
  }
}