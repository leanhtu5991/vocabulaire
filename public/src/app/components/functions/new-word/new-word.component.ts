import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/data/word';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import {Router} from '@angular/router';
import { CONST } from '../../../data/global';
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  newWord : Word = new Word(-1, "", "", 1, 1, "", "");
  phd_word    : string = "Please enter your new word.";
  phd_define  : string = "Please enter your definition.";
  myForm = new FormGroup({});
  cw : any = CONST.CONFIG_WORD;
  hiddenMessage = true;
  userId;
  constructor(private formBuilder: FormBuilder, private wordService : WordService, private router: Router, private authenticationService: AuthenticationService) {
    this.myForm = formBuilder.group({
      word:       [this.newWord.word, [Validators.required]],
      translate:  [this.newWord.translate, [Validators.required, Validators.minLength(2)]], 
      type :      [this.newWord.type, [Validators.required]],
      example1 :      [this.newWord.example1, [Validators.required]],
      example2 :      [this.newWord.example2]
    });
    }

  ngOnInit() {
    this.authenticationService.profile().subscribe(data => {
      console.log(data)
      this.userId = data.id;
    })
  }

  onSubmit()
  {
    console.log("Form submitted.");
    if (this.myForm.valid)
    {
      this.hiddenMessage = true;
      this.newWord = this.myForm.value;
      this.newWord.idbox = 1; //Default
      console.log(this.newWord)
      this.wordService.saveNewWord(this.userId, this.newWord).subscribe(data => {
        console.log(data)
        // this.userId = data.id;
      });
      this.router.navigate(['/notebook']); // Navigate to dashboard view
    } else {
      this.hiddenMessage = false;
    }
  }
}
