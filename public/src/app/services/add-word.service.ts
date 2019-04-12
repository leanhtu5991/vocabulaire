import { Injectable } from '@angular/core';
import { Word } from '../data/word';

@Injectable({
  providedIn: 'root'
})
export class AddWordService {

  constructor() { }

  public saveNewWord(word : Word){
    console.log(word.word + " is saved.");
  }
}
