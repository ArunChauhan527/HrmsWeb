import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LeaveServiceService } from 'src/app/service/leave-service.service';
import { Action } from '../attandance/AttendanceStatus';
import { Leave, LeaveDuration, LeaveStatus, LeaveType } from './LeaveModel';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  applyLeave : boolean = false;

  leave! : Leave;
  Type = LeaveType;
  duration = LeaveDuration;
  Leaves : Leave[] = [];
  totalNumber=0;
  page=0;
  size=5;
  constructor(private auth : AuthenticationService, private leaveSer : LeaveServiceService, private snackBar : MatSnackBar) { }
  
  displayedColumns : string[] = ['Sno', 'Type', 'Status','noDays','fromDate','toDate','appliedOn','appliedBy','approvedOn','approvedBy','action'];
  ngOnInit(): void {
    this.auth.checkAuth();
    this.getLeaveRecords(this.page,this.size);
  }

  applyLeaveFun(){
   this.applyLeave = !this.applyLeave;
   console.log("applyLeave :", this.applyLeave);
  }

  saveLeave(LeaveType : any, startDate : any, endDate : any, leaveDur: any, noDays : any, reason : any){
   console.log(LeaveType, startDate, endDate, leaveDur, noDays, reason);    
  if(LeaveType !== undefined && (startDate !== undefined || startDate !== '') && (endDate !== undefined && endDate !== '') && leaveDur !== undefined && (noDays !== '0' && noDays !== '' ) && (reason !== undefined && reason !== ''))
  {
    let leave  = new Leave(0,0,LeaveType,leaveDur,LeaveStatus.applied,noDays,new Date(),new Date(startDate),new Date(endDate),'',
    new Date('null'),'','', new Date(), '', reason, Action.Pending);
    this.leaveSer.applyLeave(leave).subscribe({
     next :(val)=>{
       console.log(val);
       this.snackBar.open('Leave has been applied Sucessfully','okay',{duration : 3000});
       this.getLeaveRecords(this.page,this.size);
     },
     error : (err)=>{
       console.log(err);
     }
    });
  }
  else{
    this.snackBar.open('Please fill all required fields', 'okay');
  }
  
  }

  getLeaveRecords(page: number, size: number){
   this.leaveSer.getLeaveRecords(page, size).subscribe({
    next: (val)=>{
     this.Leaves = val.content;
     this.totalNumber = val.totalElement;
    },
    error: (err)=> {
      console.log(err);
      this.snackBar.open('something went wrong','okay', {duration : 5000});
    },
   });
  }

  pageEvent(event : any){
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.totalNumber = event.length;
    this.getLeaveRecords(this.page,this.size);

  }
  
}
