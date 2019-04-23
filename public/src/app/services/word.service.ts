import { Injectable } from '@angular/core';
import { Word } from '../data/word';
import { LIST_WORD_EXAMPLE } from '../data/global';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  public saveNewWord(word : Word){
    console.log(word.word + " is saved.");
  }

  public modifyWord(modWord : Word){
    //Update new word to list:
    let  w = LIST_WORD_EXAMPLE.find(w => w.id == modWord.id);
    w.translate  = modWord.translate;
    w.idbox      = modWord.idbox;
    w.type       = modWord.type;
    console.log(w.word + " is saved.");
    return w;
  }
}