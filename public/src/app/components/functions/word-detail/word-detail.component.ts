import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/data/word';
import { CONFIG_BOX } from 'src/app/data/global';
import { CONFIG_WORD } from 'src/app/data/global';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word : Word;
  cb : any = CONFIG_BOX;
  cw : any = CONFIG_WORD;
  modifyForm = new FormGroup({});
  modify = false;
  constructor() {}

  ngOnInit() {
  }

  checkWord(){
    return (typeof this.word === 'undefined');
 }
 saveWord(){
   this.modify = false;
 }
}