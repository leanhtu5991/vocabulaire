import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import { Router } from '@angular/router';
import { CONST } from '../../../data/global';
import { AuthenticationService } from 'src/app/services/auth.service';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  cw = CONST.CONFIG_WORD;
  userId : any;
  matcher = new MyErrorStateMatcher();

  wordInput       = new FormControl('', Validators.required);
  translateInput  = new FormControl('', [Validators.required, Validators.minLength(2)]);
  typeInput       = new FormControl('', Validators.required);
  example1Input   = new FormControl('');
  example2Input   = new FormControl('');
  
  newwordForm = new FormGroup({
    word: this.wordInput,
    translate: this.translateInput,
    type: this.typeInput,
    example1 : this.example1Input,
    example2 : this.example2Input
  });

  constructor(private wordService: WordService, private authenticationService : AuthenticationService, private router: Router) {}

  ngOnInit() { 
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id;
    })
  }

  onSubmit() {
    let newWord = this.newwordForm.value;
    newWord.idbox = 1; //Default
    this.wordService.saveNewWord(this.userId, newWord).subscribe(datas => {
      localStorage.removeItem(CONST.KEY_LISTWORD);
      this.wordService.getListWord(this.userId).subscribe(datas => {
        let lstWord = datas;
        localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(lstWord));
      })  
      this.router.navigate(['/notebook']);
      // this.userId = data.id;
    });
     // Navigate to dashboard user view
  }
}
