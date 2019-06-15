import { Component, OnInit, ViewChild } from '@angular/core';
import { CONST } from 'src/app/data/global';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/data/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord;
  lstBox = CONST.CONFIG_BOX;
  selectedWord : any;
  userId;
  selectedBox;
  countdown;  
  wordValid;
  constructor(private serviceWord : WordService, private authenticationService: AuthenticationService) {
    // this.lstWord = serviceWord.getCurrentWordList();
  }

  ngOnInit() {
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id
      this.serviceWord.getListWord(this.userId).subscribe(datas => {
        this.lstWord = datas;
        if(localStorage.getItem(CONST.KEY_LISTWORD) === null || localStorage.getItem(CONST.KEY_LISTWORD) == null){
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        } else {
          localStorage.removeItem(CONST.KEY_LISTWORD)
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        }
        this.selectedWord = undefined;
        this.lstWord.forEach(word => {
          if((word.validTime - word.time)>=0){
            word.timeValid = true;
          }
        });
      })  
    })
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  selectedBoxFilter(){
    this.lstWord = JSON.parse(localStorage.getItem(CONST.KEY_LISTWORD));
    if(this.selectedBox != 0) {
      this.lstWord = this.lstWord.filter(word => parseInt(word.idbox) == parseInt(this.selectedBox));
    }
  }

  onUpdateWord(){
    // this.lstWord = this.serviceWord.getCurrentWordList();
  }

  onDeleteWord(w : Word){
    // this.lstWord = this.serviceWord.removeWord(w);
    this.selectedWord = undefined;
  }

}
