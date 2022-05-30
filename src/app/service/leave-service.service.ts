import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NationalHoliday } from '../modules/home/NationalLeave';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {

  url = environment.url;
  constructor( private http: HttpClient) { }

  getNationalLeave(industry : string): Observable<NationalHoliday[]>{
   return this.http.get<NationalHoliday[]>(this.url+'getNationalHoliday?industry='+industry);
  }
}
