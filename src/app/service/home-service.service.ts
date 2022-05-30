import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../component/side-bar/MenuList';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  url  = environment.url;

  constructor(private http : HttpClient) { }

  fetchModule(): Observable<MenuItem[]>
  {
    return this.http.get<MenuItem[]>(this.url);
  }


}
