import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/data/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import {Router} from '@angular/router';
import { CONST } from '../../../data/global';
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
  cw : any = CONST.CONFIG_WORD;
  hiddenMessage = true;
  constructor(private formBuilder: FormBuilder, private wordService : WordService, private router: Router) {
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
      this.wordService.saveNewWord( this.newWord);
      this.router.navigate(['/notebook']); // Navigate to dashboard view
    } else {
      this.hiddenMessage = false;
    }
  }
}
