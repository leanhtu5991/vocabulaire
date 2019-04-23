import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../data/word';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CONFIG_WORD } from '../data/global';

@Pipe({
  name: 'wordType'
})
export class WordTypePipe implements PipeTransform {
  constructor(private _sanitizer:DomSanitizer) {}
  transform(word: Word, args?: any): SafeHtml {
    let typeWord  = '';
    let typeColor = '';
    let outputApply = '';
    CONFIG_WORD.forEach(function(type){
      if(type.id == word.type){
        typeWord = type.type;
        typeColor = type.color;
        outputApply = '<p style="color:' + typeColor + ';">' + word.word + " " + typeWord + '</p>';
      }
    })
    return this._sanitizer.bypassSecurityTrustHtml(outputApply);;
  }

}
