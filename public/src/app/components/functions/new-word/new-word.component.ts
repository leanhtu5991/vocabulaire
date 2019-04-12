import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/data/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddWordService } from 'src/app/services/add-word.service';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  newWord : Word = new Word(-1, "", "");
  phd_word    : string = "Please enter your new word.";
  phd_define  : string = "Please enter your definition.";
  myForm = new FormGroup({})
  constructor(private formBuilder: FormBuilder, private svSave : AddWordService) {
    this.myForm = formBuilder.group({
      word:       [this.newWord.word, [Validators.required]],
      translate:  [this.newWord.translate, [Validators.required, Validators.minLength(2)]]
    });
    }

  ngOnInit() {}

  onSubmit()
  {
    console.log("Form submitted.");
    if (this.myForm.valid)
    {
      this.newWord = this.myForm.value;
      this.svSave.saveNewWord( this.newWord);
    }
  }
}
