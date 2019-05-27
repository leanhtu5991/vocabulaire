import { Injectable } from '@angular/core';
import { QuestionQCM, QCMResponse } from '../data/question';
import { WordService } from './word.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(public wordService : WordService, private http: HttpClient) {
      
   }

  createListQuestion(userId : number){
    let lstWord = this.wordService.getCurrentWordList(userId);
    let lstQuestion = [];
    lstWord.forEach(function(word) {
      let wordId = word.id;
      let ask = "What is the definition of " + word.word + " ?";
      let oA = word.translate;
      let oB = "BBB";
      let oC = "CCC";
      let oD = "DDD";
      let s  = QCMResponse.optionA;
      let q = new QuestionQCM(wordId, ask, oA, oB, oC, oD, s);
      lstQuestion.push(q)
    });
    console.log('here',lstQuestion)
    return lstQuestion;
  }


}