import { Component, OnInit } from '@angular/core';
import { LIST_WORD_EXAMPLE } from '../../../data/global';
import { CONFIG_BOX } from 'src/app/data/global';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord = LIST_WORD_EXAMPLE;
  lstBox = CONFIG_BOX;
  selectedWord : any;
  constructor() { }

  ngOnInit() {
    this.selectedWord = undefined;
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  selectBoxFilter(event){
    let value = event.target.value;
    this.lstWord = LIST_WORD_EXAMPLE;
    if(value != 0) {
      this.lstWord = this.lstWord.filter(word => word.idbox == value);
    }
  }

}
