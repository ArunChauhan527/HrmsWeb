import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartType,  Chart } from 'chart.js';
import { AttendanceServiceService } from 'src/app/service/attendance-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { LeaveServiceService } from 'src/app/service/leave-service.service';
import { Attandance } from '../attandance/AttandanceModel';
import { Action, AttendanceStatus } from '../attandance/AttendanceStatus';
import { NationalHoliday } from './NationalLeave';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public doughnutChartType: ChartType = 'doughnut';
  time : Date = new Date();
  punchIn : boolean = false;
  nationalLeave : NationalHoliday[] =[];
  today! : Attandance;
  requestCount : Number = 0; 
  hours : Number  = 0;
  public chart!: Chart ;
  public salary!: Chart;
  constructor( private leave: LeaveServiceService, private auth: AuthenticationService,
     private home: HomeServiceService, private attend : AttendanceServiceService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
    setInterval(()=>{
      this.time = new Date()
    }, 1000);
    this.getNationalLeave();
    this.getLeaveCount();
    this.home.getToday().subscribe({
      error: (err) =>{
       console.log(err);
      },
      next : (val)=>{
        this.today = val;
        if(this.today!= null)
        {
          if(this.today.value === 0)
          {
            var punchIn: Date = new Date(this.today.punchIn);
           this.hours = Math.floor((new Date().getTime() - punchIn.getTime()) / (1000 * 60 * 60) % 24);
           console.log(this.hours);
          }
           this.punchIn = true;
        }
      }
    });
    this.home.getRequestCount().subscribe({error :(err)=>{
     console.log(err);
    },
    next: (val)=>{
      this.requestCount = val;
      console.log(val);
    }
  });
  
  }

  OnPunchIn(){
    let today = new Attandance('','',new Date(),new Date('null'), '', new Date(), '', '',new Date(),new Date('null'), '',0, AttendanceStatus.Self, Action.Pending, '');
    this.attend.saveAttendance(today).subscribe({
      next: (tod)=>{
        this.today = tod;
      },
      error :(err)=>{
        console.log(err)
      }

    });
    this.punchIn = true;
  }

  OnPuncOut(){
    this.today.punchOut = new Date();
    this.today.updatedAt = new Date();
    this.attend.saveAttendance(this.today).subscribe({
      next: (tod)=>{
        this.today = tod;
      },
      error :(err)=>{
        console.log(err)
      }

    }); 
  }

  getNationalLeave(){
  this.leave.getNationalLeave().subscribe(res=>{
     this.nationalLeave = res;
     console.log(this.nationalLeave);
  });
  }

  getLeaveCount(){
    this.leave.getLeaveCount().subscribe(res=>{
      
     this.chart = new Chart("MyChart",{
      type: this.doughnutChartType,
      data: {
        labels : ['Approved Leaved','Unapproved Leave', 'Planned Leave','Casual Leave', 'Applied Leave'],
        datasets :[{
          data: [res?.approvedLeave, res?.unapprovedLeave, res?.plannedLeave, res?.casualLeave, res?.appliedLeave],
          backgroundColor : ['Red', 'blue','green','purple','yellow'],
          hoverOffset :4
        }]
      }
     })

    console.log(this.chart);
    })
  }




}
