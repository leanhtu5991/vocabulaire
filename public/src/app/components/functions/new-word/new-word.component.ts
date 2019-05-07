import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import { Router } from '@angular/router';
import { CONST } from '../../../data/global';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  cw = CONST.CONFIG_WORD;
  matcher = new MyErrorStateMatcher();

  wordInput = new FormControl('', Validators.required);
  translateInput = new FormControl('', [Validators.required, Validators.minLength(2)]);
  typeInput = new FormControl('', Validators.required);

  newwordForm = new FormGroup({
    word: this.wordInput,
    translate: this.translateInput,
    type: this.typeInput
  });

  constructor(private wordService: WordService, private router: Router) {}

  ngOnInit() { }

  onSubmit() {
    let newWord = this.newwordForm.value;
    newWord.idbox = 1; //Default
    this.wordService.saveNewWord(newWord);
    this.router.navigate(['/notebook']); // Navigate to dashboard user view
  }
}
