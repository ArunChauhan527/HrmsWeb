import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  applyLeave : boolean = false;
  constructor() { }
  
  displayedColumns : string[] = ['Sno', 'Type', 'Status','appliedOn','appliedBy','approvedOn','approvedBy'];
  ngOnInit(): void {
  }

  applyLeaveFun(){
   this.applyLeave = true;
   console.log("applyLeave :", this.applyLeave);
  }
}
