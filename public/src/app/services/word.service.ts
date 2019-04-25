import { Injectable } from '@angular/core';
import { Word } from '../data/word';
import { CONST } from '../data/global';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  public getListWord(userId : any){
    console.log("Service Get List Word by user Id");
    localStorage.removeItem(CONST.KEY_LISTWORD);
    //Service get list word, then save to local storage
    localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(CONST.LIST_WORD_EXAMPLE));
  }

  public saveNewWord(word : Word){
    console.log(word.word + " is saved.");
    //Save to server...
    //Then update localStorage
    let lstWord = this.getCurrentWordList();
    word.id = lstWord.length + 1;
    lstWord.unshift(word);
    localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
  }

  public modifyWord(modWord : Word){
    //Update new word to list:
    let lstWord = this.getCurrentWordList();
    if(lstWord.length == 0) return;
    let index = lstWord.findIndex(w => w.id == modWord.id);
    if(index == -1) return;
    lstWord[index].translate  = modWord.translate;
    lstWord[index].idbox      = modWord.idbox;
    lstWord[index].type       = modWord.type;
    localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
    console.log(lstWord[index].word + " is saved.");
    return lstWord[index];
  }

  public removeWord(delWord : Word){
    //Update new word to list:
    let lstWord = this.getCurrentWordList();
    if(lstWord.length == 0) return;
    let index = lstWord.findIndex(w => w.id == delWord.id);
    if(index == -1) return;
    lstWord.splice(index, 1);
    localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
    console.log(delWord.word + " is deleted.");
    return lstWord;
  }


  public getCurrentWordList(){
    let lstWord = JSON.parse(localStorage.getItem(CONST.KEY_LISTWORD));
    return lstWord == null ? Word[0] : lstWord;
  }
}