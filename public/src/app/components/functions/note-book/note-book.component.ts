import { Component, OnInit, ViewChild } from '@angular/core';
import { CONST } from 'src/app/data/global';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/data/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord : any[];
  lstBox = CONST.CONFIG_BOX;
  selectedWord : any;
  userId = 0;
  constructor(private serviceWord : WordService) {
    this.lstWord = serviceWord.getCurrentWordList();
  }

  ngOnInit() {
    this.selectedWord = undefined;
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  selectBoxFilter(event){
    let value = event.target.value;
    this.lstWord = this.serviceWord.getCurrentWordList();
    if(value != 0) {
      this.lstWord = this.lstWord.filter(word => word.idbox == value);
    }
  }

  onUpdateWord(){
    this.lstWord = this.serviceWord.getCurrentWordList();
  }

  onDeleteWord(w : Word){
    this.lstWord = this.serviceWord.removeWord(w);
    this.selectedWord = undefined;
  }

}
