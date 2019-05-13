import { Injectable } from '@angular/core';
import { Qcm, responseQCM } from '../data/question';
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
      let a  = responseQCM.optionA;
      let q = new Qcm(ask, oA, oB, oC, oD, a);
      lstQuestion.push(q);
    });
    return lstQuestion;
  }
}