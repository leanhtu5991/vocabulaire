import { Component, OnInit } from '@angular/core';
import { LIST_WORD_EXAMPLE } from '../../../data/global';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord : any;
  selectedWord : any;
  constructor() { }

  ngOnInit() {
    this.lstWord = LIST_WORD_EXAMPLE;
    console.log(this.lstWord);
    this.selectedWord = undefined;
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

}
