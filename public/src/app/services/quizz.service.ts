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

  public getWordValidateTime(userId: any){
  // return JSON.parse(localStorage.getItem(CONST.KEY_LISTWORD));
    return this.http.get<any>('/api/getWordForQuestion/'+userId, this.headers);
  //return this.http.get('/api/getWordByUser/'+userId, this.headers);
  }
  // createListQuestion(userId : number){
    // let lstQuestion = [];
    // this.wordService.getWordValidateTime(userId).subscribe(data => {
    //   data.forEach(word=>{
    //   // lstWord.forEach(word=> {
    //     let wordId = word.id;
    //     let ask = "What is the definition of " + word.word + " ?";
    //     let oA = word.translate;
    //     let oB = "BBB";
    //     let oC = "CCC";
    //     let oD = "DDD";
    //     let s  = QCMResponse.optionA;
    //     let q = new QuestionQCM(wordId, ask, oA, oB, oC, oD, s);
    //     console.log(q)
    //     lstQuestion.push(q)
    //   })
    //   console.log('here',lstQuestion.length) ;
    // })
    // return lstQuestion;
    // console.log('here',lstQuestion.length) 
  // }


}