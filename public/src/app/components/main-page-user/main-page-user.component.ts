import { Component, OnInit } from '@angular/core';
import { CONST } from 'src/app/data/global';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-main-page-user',
  templateUrl: './main-page-user.component.html',
  styleUrls: ['./main-page-user.component.css']
})
export class MainPageUserComponent implements OnInit {
  userId = 0;
  constructor(serviceWord : WordService) {
    serviceWord.getListWord(this.userId);
  }

  ngOnInit() {
  }

}
