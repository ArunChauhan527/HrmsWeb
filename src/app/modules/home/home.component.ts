import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset, Chart } from 'chart.js';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LeaveServiceService } from 'src/app/service/leave-service.service';
import { NationalHoliday } from './NationalLeave';

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
  nationalLeave : NationalHoliday[] =[];
  constructor( private leave: LeaveServiceService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
    setInterval(()=>{
      this.time = new Date()
    }, 1000);
    this.getNationalLeave('001');
  }

  OnPunchIn(){
    this.punchIn = true;
  }

  getNationalLeave(industry : string){
  this.leave.getNationalLeave(industry).subscribe(res=>{
     this.nationalLeave = res;
     console.log(this.nationalLeave);
  });
  }

}
