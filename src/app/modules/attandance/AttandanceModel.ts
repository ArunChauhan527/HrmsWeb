import { ExecOptionsWithStringEncoding } from "child_process";
import { Action, AttendanceStatus } from "./AttendanceStatus";

export class Attandance
{
    attId     : string;
    empCode   : string;
    punchIn   : Date;
    punchOut  : Date;
    industry  : string;
    createdAt : Date;
    createdBy : string;
    updatedBy : string;
    updatedAt : Date;
    approvedAt: Date;
    approvedBy: string;
    value : number;
    status : AttendanceStatus;
    action: Action;
    reason : string;
    constructor(attId : string, empId: string, punchIn : Date, punchOut : Date, industry : string,
      createdAt : Date, createdBy : string, updatedBy : string, updatedAt : Date, approvedAt: Date, 
      approvedBy: string, value : number, status : AttendanceStatus, action: Action, reason : string){
      this.attId = attId;
      this.empCode = empId;
      this.punchIn = punchIn;
      this.punchOut = punchOut;
      this.industry = industry;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.updatedAt = updatedAt;
      this.updatedBy = updatedBy;
      this.approvedAt = approvedAt;
      this.approvedBy = approvedBy;
      this.value = value;
      this.status= status; 
      this.action = action;
      this.reason = reason;
    }
}