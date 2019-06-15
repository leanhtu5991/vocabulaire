import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/data/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CONST } from 'src/app/data/global'; 

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  userId: any;
  lstWord: any;
  wordInBoxPie: any = {
    box1 : 0,
    box2 : 0,
    box3 : 0,
    box4 : 0,
    box5 : 0,
    box6 : 0
  }
  wordInBox: any = {
    box1 : 0,
    box2 : 0,
    box3 : 0,
    box4 : 0,
    box5 : 0,
    box6 : 0
  }
  constructor(private serviceWord : WordService, private authenticationService: AuthenticationService) { 

  }

  ngOnInit() {
    this.authenticationService.profile().subscribe(data => {
      this.userId = data.id
      this.serviceWord.getListWord(this.userId).subscribe(datas => {
        this.lstWord = datas;
        if(localStorage.getItem(CONST.KEY_LISTWORD) === null || localStorage.getItem(CONST.KEY_LISTWORD) == null){
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        } else {
          localStorage.removeItem(CONST.KEY_LISTWORD)
          localStorage.setItem(CONST.KEY_LISTWORD, JSON.stringify(this.lstWord));
        }
        this.lstWord.forEach(word => {
          switch(word.idbox) {
            case 1:
              this.wordInBox['box1'] +=1;
              break;
            case 2:
              this.wordInBox['box2'] +=1;
              break;
            case 3:
              this.wordInBox['box3'] +=1;
            break;
            case 4:
              this.wordInBox['box4'] +=1;
            break;
            case 5:
              this.wordInBox['box5'] +=1;
            break;
            case 6:
              this.wordInBox['box6'] +=1;
            break;
            default:
              // code block
          }
        })
        
        for(var i=0; i< Object.keys(this.wordInBox).length; i++){
          this.wordInBoxPie = {
            box1 : (this.wordInBox['box1']/this.lstWord.length)*100,
            box2 : (this.wordInBox['box2']/this.lstWord.length)*100,
            box3 : (this.wordInBox['box3']/this.lstWord.length)*100,
            box4 : (this.wordInBox['box4']/this.lstWord.length)*100,
            box5 : (this.wordInBox['box5']/this.lstWord.length)*100,
            box6 : (this.wordInBox['box6']/this.lstWord.length)*100
          }
        }
        this.chartPie()
        this.chartColumn()
      })  
    })
  }

  chartPie(){
    var options: any = {
      chart: {
        // backgroundColor: '#19a114',
        borderColor: 'black',
        borderWidth: 2,
        type: 'pie',
      },
      title: {
        text: 'Word in box'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %'
            },
            showInLegend: true
        }
      },
      series: [{
        data: [
          {
            name: 'Box 1',
            y: this.wordInBoxPie['box1'],
          }, 
          {
            name: 'Box 2',
            y: this.wordInBoxPie['box2']
          }, 
          {
            name: 'Box 3',
            y: this.wordInBoxPie['box3']
          }, 
          {
            name: 'Box 4',
            y: this.wordInBoxPie['box4']
          }, 
          {
            name: 'Box 5',
            y: this.wordInBoxPie['box5']
          }, 
          {
            name: 'Box 6',
            y: this.wordInBoxPie['box6']
          }
        ]   
      }]
    }
    Highcharts.chart('wordInBoxPie', options)
  }

  chartColumn(){
    var options: any = {
      chart: {
        borderColor: 'black',
        borderWidth: 2,
        type: 'column'
    },
    title: {
        text: 'Number words in box'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      allowDecimals: false,
      title: {
          text: 'Number words'
      }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    series: [{
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
            name: "Box1",
            y: this.wordInBox['box1'],
            drilldown: "Box1"
        },
        {
            name: "Box2",
            y: this.wordInBox['box2'],
            drilldown: "Box2"
        },
        {
            name: "Box3",
            y: this.wordInBox['box3'],
            drilldown: "Box3"
        },
        {
            name: "Box4",
            y: this.wordInBox['box4'],
            drilldown: "Box4"
        },
        {
            name: "Box5",
            y: this.wordInBox['box5'],
            drilldown: "Box5"
        },
        {
            name: "Box6",
            y: this.wordInBox['box6'],
            drilldown: "Box6"
        }
      ]
    }],
    }
    Highcharts.chart('wordInBoxColumn', options)
  }
}
