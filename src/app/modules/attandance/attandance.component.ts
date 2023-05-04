import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AttendanceServiceService } from 'src/app/service/attendance-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptionService } from 'src/app/service/encryption.service';
import { Attandance } from './AttandanceModel';
import { Action, AttendanceStatus } from './AttendanceStatus';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css']
})
export class AttandanceComponent implements OnInit {

  empCode:string='';
  industry: string = '';
  attandance: Attandance[]=[];
  punchIn : boolean =false;
  regulate : boolean = false;
  createdBy: string ='';
  today!: Attandance; 
  public startDate!: Date;
  public endDate! : Date;
  status  = AttendanceStatus;
  currDatTime = new Date();
  constructor(private attend: AttendanceServiceService, private auth : AuthenticationService, private active : ActivatedRoute
    ,private encrypt : EncryptionService, public datepipe: DatePipe, private snakBar : MatSnackBar) { }  

  ngOnInit(): void {
    setInterval(()=>{
      this.currDatTime = new Date()
    }, 1000);
    this.startDate = new Date();
    this.endDate = new Date();
    console.log(this.startDate.toUTCString(),this.startDate.getDay());
    if(this.startDate.getDay()!==0)
    {
      this.startDate.setDate(this.startDate.getDate()-this.startDate.getDay());
      this.startDate = this.startDate;
    }
    this.endDate.setDate(this.startDate.getDate()+6);
    console.log(this.endDate.toISOString()); 
    this.auth.checkAuth();
    this.active.queryParams.subscribe(res=>{this.industry = this.encrypt.decrypt(res['ind']);});
    this.fetchWeek();
  }

  

  fetchWeek(){
    let start = this.datepipe.transform(this.startDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
    let end = this.datepipe.transform(this.endDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
   this.attend.fetchAttendance(start, end).subscribe({
    error: (err)=>{
      console.log(err);
    }, 
    next : (val)=>{
        this.attandance = val;
        this.today  = this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()})!==undefined?this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()}) as Attandance:this.today; 
        console.log(this.today.status, AttendanceStatus.Self, this.today.status as AttendanceStatus === AttendanceStatus.Self);
        if(this.today.status  ==AttendanceStatus.Self)
        {
          this.punchIn = true;
        }
    }
   });
  }

  fetchPreviousWeek(){
    console.log(this.startDate.getDate()-6)
    this.startDate = new Date( this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()-7);
    this.endDate  = new Date( this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()-7);
    let start = this.datepipe.transform(this.startDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
    let end = this.datepipe.transform(this.endDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
    this.attend.fetchAttendance(start, end).subscribe({
      error: (err)=>{
        console.log(err);
      }, 
      next : (val)=>{
          this.attandance = val;
          this.today  = this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()})!==undefined?this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()}) as Attandance:this.today; 
          console.log(this.today.status, AttendanceStatus.Self, this.today.status as AttendanceStatus === AttendanceStatus.Self);
          if(this.today.status  ==AttendanceStatus.Self)
          {
            this.punchIn = true;
          }
      }
     });
  }

  fetchNextWeek(){
    let flag = this.currDatTime.getTime()<=this.endDate.getTime();
    flag = !flag? flag : this.currDatTime.getTime()>=this.startDate.getTime();
    if(!flag)
    {
    this.startDate = new Date( this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()+7);
    this.endDate  = new Date( this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()+7);
    let start = this.datepipe.transform(this.startDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
    let end = this.datepipe.transform(this.endDate,"yyyy-MM-dd'T'hh:mm:ss.SSS'Z'");
    this.attend.fetchAttendance(start, end).subscribe({
      error: (err)=>{
        console.log(err);
      }, 
      next : (val)=>{
          this.attandance = val;
          this.today  = this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()})!==undefined?this.attandance.find(fil=>{ return new Date(fil.punchIn).getDate()===this.currDatTime.getDate()}) as Attandance:this.today; 
          console.log(this.today.status, AttendanceStatus.Self, this.today.status as AttendanceStatus === AttendanceStatus.Self);
          if(this.today.status  ==AttendanceStatus.Self)
          {
            this.punchIn = true;
          }
      }
     });
    }
  }

  OnpunchIn(){
    this.punchIn = true;
    this.today.status= AttendanceStatus.Self;
    this.today.createdAt = new Date();
    this.today.punchIn = new Date();
    this.today.updatedAt= new Date();
    this.attend.saveAttendance(this.today).subscribe({
      next: (tod)=>{
        this.today = tod;
      },
      error :(err)=>{
        console.log(err)
      }

    });
  }


  OnpunchOut(){
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

  Onregulate(){
    this.regulate = !this.regulate;
  }

  regulateReq(regulateDate: string, punchIn :string, punchOut: string, reason : string )
  {
    console.log(punchIn, punchOut, regulateDate);
    
    const reg =  new Attandance('', '',this.attend.createDateAndTime(regulateDate,punchIn),this.attend.createDateAndTime(regulateDate,punchOut),'',
    new Date(),'','',new Date(),new Date('null'),'',0,AttendanceStatus.Regulate,Action.Pending, reason);
    console.log(reg);
    this.attend.regulate(reg).subscribe({next :(val)=>{
      console.log(val);
       this.snakBar.open('Attendance is successfully regulated','okay',{duration : 5000});
      this.fetchWeek();
    }});
  }



}
