import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Word } from 'src/app/data/word';
import { CONFIG_BOX } from 'src/app/data/global';
import { CONFIG_WORD } from 'src/app/data/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  cb: any = CONFIG_BOX;
  cw: any = CONFIG_WORD;
  modifyForm = new FormGroup({});
  modify = false;
  modWord: Word;
  hiddenMessage = true;
  fb: FormBuilder = new FormBuilder();
  constructor(fb: FormBuilder, private wordService: WordService) {
    
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.modify = false;
    this.modifyForm = this.fb.group({
      translate: [this.word === undefined ? "" : this.word.translate, [Validators.required, Validators.minLength(2)]],
      type: [this.word === undefined ? "" : this.word.type,           [Validators.required]],
      idbox: [this.word === undefined ? 1 : this.word.idbox,          [Validators.required]]
    });
  }

  checkWord() {
    return (typeof this.word === 'undefined');
  }

  submitForm() {  
    if (this.modifyForm.valid) {
      this.modify = false;
      this.hiddenMessage = true;
      this.modWord = this.modifyForm.value;
      this.modWord.id   = this.word.id;
      this.modWord.word = this.word.word;
      this.word = this.wordService.modifyWord(this.modWord);
    } else {
      this.hiddenMessage = false;
    }
  }
}