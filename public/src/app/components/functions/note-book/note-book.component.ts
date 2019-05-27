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
  constructor(private serviceWord : WordService, private authenticationService: AuthenticationService) {
    // this.lstWord = serviceWord.getCurrentWordList();
  }

  ngOnInit() {
    if(localStorage.getItem(CONST.KEY_LISTWORD) === null || localStorage.getItem(CONST.KEY_LISTWORD) == null){
      console.log('1')
      this.authenticationService.profile().subscribe(data => {
        this.userId = data.id
        this.serviceWord.getListWord(this.userId).subscribe(datas => {
          this.lstWord = datas;
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        })  
      })
    } else {
      this.lstWord = JSON.parse(localStorage.getItem(CONST.KEY_LISTWORD));
      console.log(this.lstWord)
    }
    this.selectedWord = undefined;
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  selectedBoxFilter(){
    // this.lstWord = this.serviceWord.getCurrentWordList();
    if(this.selectedBox != 0) {
      this.lstWord = this.lstWord.filter(word => word.idbox == this.selectedBox);
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
