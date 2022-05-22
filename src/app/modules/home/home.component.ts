import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset, Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public doughnutChartLabels:any[] = ['Approved Leaved','Unapproved Leave', 'Paid Leave'];
  public doughnutChartData : ChartDataset[] =  [{data:[100,200,300], backgroundColor:['Red', 'blue','green']}];
  public doughnutChartType: ChartType = 'doughnut';
  time : Date = new Date();
  punchIn : boolean = false;
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.time = new Date()
    }, 1000);
  }

  OnPunchIn(){
    this.punchIn = true;
  }

}
