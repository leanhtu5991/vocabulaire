import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/data/word';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word : Word;
  constructor() {
   }

  ngOnInit() {
  }

  checkWord(){
    return (typeof this.word === 'undefined');
 }
}