import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../component/side-bar/MenuList';
import { Attandance } from '../modules/attandance/AttandanceModel';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  url  = environment.url;

  collapse : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(true);

  constructor(private http : HttpClient) { }

  fetchModule( roleId : number): Observable<MenuItem[]>
  {
    return this.http.get<MenuItem[]>(this.url+"getModules/"+roleId);
  }
  

  setSideBarStatus(flag :boolean)
  {
    this.collapse.next(flag);
  }

  getSideBarStatus():Observable<boolean>
  {
    return this.collapse.asObservable();
  }

  getToday() : Observable<Attandance>{
    return this.http.get<Attandance>(this.url+"today");
  }

  getRequestCount(): Observable<Number>
  {
    return this.http.get<Number>(this.url+"requestCount");
  }

}
