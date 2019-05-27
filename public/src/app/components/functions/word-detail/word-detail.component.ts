import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/data/word';
import { CONST } from 'src/app/data/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../pop-up/confirmation/confirmation.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  @Output() updateWord = new EventEmitter<MouseEvent>();
  @Output() deleteWord = new EventEmitter<Word>();
  cb: any = CONST.CONFIG_BOX;
  cw: any = CONST.CONFIG_WORD;
  modifyForm = new FormGroup({});
  modify = false;
  modWord: Word;
  hiddenMessage = true;
  fb: FormBuilder = new FormBuilder();
  userId: any;
  constructor(fb: FormBuilder, private wordService: WordService, private dialog : MatDialog, private authenticationService : AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.word) return;
    this.modify = false;
    this.modifyForm = this.fb.group({
      translate: [this.word.translate, [Validators.required, Validators.minLength(2)]],
      type: [this.word.type,           [Validators.required]],
      idbox: [this.word.idbox,          [Validators.required]]
    });
  }

  checkWord() {
    return (typeof this.word === 'undefined');
  }

  submitForm() {  
    if (this.modifyForm.valid) {
      this.modify = false;
      this.hiddenMessage = true;
      this.modWord       = this.modifyForm.value;
      this.modWord.id    = this.word.id;
      // this.word = this.wordService.modifyWord(this.modWord);
      this.updateWord.emit();
    } else {
      this.hiddenMessage = false;
    }
  }

  public confirmDelete() : void {
    console.log(this.word.id)
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: { 
          title: 'Confirm Delete',
          message : 'Do you want to delete this word from your notebook?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked');
          this.wordService.deleteWord(this.word).subscribe(datas => {
            localStorage.removeItem(CONST.KEY_LISTWORD);
            this.wordService.getListWord(this.userId).subscribe(datas => {
              let lstWord = datas;
              localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
            })  
            console.log(datas)
          })  
          // this.deleteWord.emit(this.word);
        }
      });
  }
}