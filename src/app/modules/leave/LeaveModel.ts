import { Action } from "../attandance/AttendanceStatus";

export class Leave{
  sno : number;
  empCode : number;
  type : LeaveType;
  leaveDuration : LeaveDuration;
  status : LeaveStatus;
  noLeave : number;
  appliedon : Date;
  fromDate : Date;
  toDate : Date;
  appliedBy : string;
  approvedOn: Date;
  approvedBy : string;
  updatedBy : string;
  updatedOn : Date;
  industry : string;
  reason : string;
  action : Action;
  constructor(sno: number, empCode : number, type: LeaveType, leaveDuration : LeaveDuration, status : LeaveStatus, noLeave: number,
    appliedon: Date, fromDate : Date, toDate: Date, appliedBy : string, approvedOn: Date, approvedBy : string,
    updatedBy : string, updatedOn : Date, industry : string, reason : string, action : Action)
  {
    this.sno = sno;
    this.empCode = empCode;
    this.type = type;
    this.leaveDuration = leaveDuration;
    this.status = status;
    this.noLeave = noLeave;
    this.appliedon =appliedon;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.appliedBy = appliedBy;
    this.approvedOn = approvedOn;
    this.approvedBy = approvedBy;
    this.updatedBy = updatedBy;
    this.updatedOn = updatedOn;
    this.industry = industry;
    this.reason = reason;
    this.action = action;
  }


}

export enum LeaveType {
    PL='PL',
    CL='CL',
    LWP='LWP'
}

export enum LeaveDuration {
    FIRSTHALF='FIRSTHALF',
    SECONDHALF='SECONDHALF',
    FullDay='FullDay'  
}

export enum LeaveStatus {
    approved='approved',
    unapproved='unapproved',
    applied='applied',
    cancelled='cancelled'
}