import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
  styleUrls: ['./quizz-result.component.css']
})
export class QuizzResultComponent {

  title = "Your test result";
  score : String;
  totalQuestion: number;
  totalTrue : number;

  constructor(
    public dialogRef: MatDialogRef<QuizzResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.totalQuestion = data.totalQuestion;
        this.totalTrue = data.totalTrue;
        this.score = data.score;
    }
}
