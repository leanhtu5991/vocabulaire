import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../data/word';
import { CONST } from '../data/global';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable';
@Injectable({
  providedIn: 'root'
})
export class WordService {
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private http: HttpClient) { }

  public getListWord(userId){
    // console.log("Service Get List Word by user Id");
    // localStorage.removeItem(CONST.KEY_LISTWORD);
    //Service get list word, then save to local storage
    // 
    return this.http.get('/api/getWordByUser/'+userId, this.headers);
  }

  public saveNewWord(userId, word){
    return this.http.post('/api/saveWordToUser/'+userId, word);
  }

  public modifyWord(modWord : Word){
    return this.http.post('/api/modifyWord', modWord);
  }

  public deleteWord(delWord : Word){
    return this.http.delete('/api/deleteWord/'+delWord.id, this.headers);
    //Update new word to list:
    // let lstWord = this.getCurrentWordList();
    // if(lstWord.length == 0) return;
    // let index = lstWord.findIndex(w => w.id == delWord.id);
    // if(index == -1) return;
    // lstWord.splice(index, 1);
    // localStorage.setItem(CONST.KEY_LISTWORD, lstWord);
    // console.log(delWord.word + " is deleted.");
    // return lstWord;
  }

  public updateStatutWord(wordID, result){
    return this.http.post('/api/updateStatutWord/'+wordID+'/'+result, this.headers);
  }
}