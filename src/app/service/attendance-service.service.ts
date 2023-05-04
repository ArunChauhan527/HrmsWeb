import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detectOverflow } from '@popperjs/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attandance } from '../modules/attandance/AttandanceModel';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  url = environment.url;

  constructor(private http : HttpClient) { }

  saveAttendance(attend: Attandance):Observable<Attandance>{
    return this.http.post<Attandance>(this.url+'saveAttendance',attend);
  }

  fetchAttendance(startDate : any, endDate : any):Observable<Attandance[]>
  {
    return this.http.get<Attandance[]>(this.url+'getAttendance?startDate='+startDate+'&endDate='+endDate);
  }

  createDateAndTime(date: string, time : string)
  {
    const dateTime = new Date(date);
    const timeSlot = time.split(':');
    dateTime.setHours(Number(timeSlot[0]));
    dateTime.setMinutes(Number(timeSlot[1]));
    return dateTime;
  }

  regulate(att: Attandance){
    return this.http.post(this.url+'regulate',att);
  }
}
