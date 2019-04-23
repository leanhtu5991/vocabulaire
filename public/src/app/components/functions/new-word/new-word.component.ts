import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/data/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddWordService } from 'src/app/services/add-word.service';
import { CONFIG_WORD } from '../../../data/global';
@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  newWord : Word = new Word(-1, "", "", 1, 1);
  phd_word    : string = "Please enter your new word.";
  phd_define  : string = "Please enter your definition.";
  myForm = new FormGroup({});
  cw : any = CONFIG_WORD;
  hiddenMessage = true;
  constructor(private formBuilder: FormBuilder, private svSave : AddWordService) {
    this.myForm = formBuilder.group({
      word:       [this.newWord.word, [Validators.required]],
      translate:  [this.newWord.translate, [Validators.required, Validators.minLength(2)]], 
      type :      [this.newWord.type, [Validators.required]]
    });
    }

  ngOnInit() {}

  onSubmit()
  {
    console.log("Form submitted.");
    if (this.myForm.valid)
    {
      this.hiddenMessage = true;
      this.newWord = this.myForm.value;
      this.newWord.idbox = 1; //Default
      this.svSave.saveNewWord( this.newWord);
    } else {
      this.hiddenMessage = false;
    }
  }
}
