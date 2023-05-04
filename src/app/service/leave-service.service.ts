import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDataDto } from '../modules/client-module/ResponseDataDto';
import { LeavePolicy } from '../modules/config/LeavePolicy';
import { NationalHoliday } from '../modules/home/NationalLeave';
import { LeaveCount } from '../modules/leave/LeaveCount';
import { Leave } from '../modules/leave/LeaveModel';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {

  url = environment.url;
  constructor( private http: HttpClient) { }

  getNationalLeave(): Observable<NationalHoliday[]>{
   return this.http.get<NationalHoliday[]>(this.url+'getNationalHoliday');
  }

  getLeavePolicy():Observable<LeavePolicy>
  {
    return this.http.get<LeavePolicy>(this.url+'leavePolicy/findByIndustry');
  }

  saveLeavePolicy(leavePolicy : LeavePolicy):Observable<LeavePolicy>
  {
   return this.http.post<LeavePolicy>(this.url+'leavePolicy/save',leavePolicy);
  }

  applyLeave(leave : Leave): Observable<Leave>
  {
   return this.http.post<Leave>(this.url+'saveLeave', leave);
  }

  getLeaveRecords(page: number, size: number): Observable<ResponseDataDto>
  {
    return this.http.get<ResponseDataDto>(this.url+'leaves?page='+page+'&size='+size);
  }

  getLeaveCount() : Observable<LeaveCount>{
    return this.http.get<LeaveCount>(this.url+'leavesCount');
  }

}
