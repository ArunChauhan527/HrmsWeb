import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalaryConfig } from '../modules/config/SalaryConfig';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../modules/salary/EmpInfo';

@Injectable({
  providedIn: 'root'
})
export class SalaryConfigService {
  url = environment.url;
  constructor(private http : HttpClient) { }

  saveConfig(salary: SalaryConfig): Observable<SalaryConfig>{
    return this.http.post<SalaryConfig>(this.url+"save/salaryConfig", salary);
  }

  getConfig():Observable<SalaryConfig>{
    return this.http.get<SalaryConfig>(this.url+"getSalaryConfig");
  }

  getEmpInfo(name : string):Observable<EmpInfo[]>{
    return this.http.get<EmpInfo[]>(this.url+"getEmpBy?name="+name);
  }
}
