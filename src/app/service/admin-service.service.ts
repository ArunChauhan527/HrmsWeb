import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from 'path';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../component/change-password/ChangePassword';
import { MenuItem } from '../component/side-bar/MenuList';
import { Role } from '../component/side-bar/Role';
import { Client } from '../modules/client-module/Client';
import { ResponseDataDto } from '../modules/client-module/ResponseDataDto';
import { Config } from '../modules/config/Config';
import { Registration } from '../modules/home/Registration';
import { Emails } from '../modules/register/Emails';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  url = environment.url;

  clientStatus : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

 fetchModule(): Observable<MenuItem[]>{
 return this.http.get<MenuItem[]>(this.url+"findMenu");
 }

 saveClient(client : Client){
   return this.http.post(this.url+'saveClientInfo',client);
 }

 fetchIndustry(){
   return this.http.get<string>(this.url+'fetchIndustry');
 }

 fetchRole(roleId: number): Observable<Role>
 {
   return this.http.get<Role>(this.url+'getRole/'+roleId);
 }

 updateClientStatus(status : boolean){
    this.clientStatus.next(status);
 }
 
 fetchClientStatus(): Observable<boolean>{
   return this.clientStatus.asObservable();
 }

 getAllClient(client : string): Observable<Client[]>{
   return this.http.get<Client[]>(this.url+'getClient/'+client);
 }

 getClient(search: string , page : number, size : number) : Observable<ResponseDataDto>
 {
   return this.http.get<ResponseDataDto>(this.url+'getClient?searchParam='+search+'&page='+page+'&size='+size);
 }

changePassword(changePassword : ChangePassword)
{
  return this.http.post(this.url+'changePassword',changePassword);
}
 
saveRole(Config: Config){
return this.http.post(this.url+'save', Config);
}

getRole(roleName : string, page : number, size : number):Observable<ResponseDataDto>
{
return this.http.get<ResponseDataDto>(this.url+'findRole?roleName='+roleName+'&page='+page+'&size='+size);
}

saveBulkReg(formData :  FormData){
  return this.http.post(this.url+'bulkRegister',formData);
}

searchEmp(email : string, department : string, joinDate: any, page : number,size : number): Observable<ResponseDataDto>{
  return this.http.get<ResponseDataDto>(this.url+'searchEmp?email='+email+'&department='+department+'&&joiningDate='+joinDate+'&page='+page+'&size='+size);
}

searchByIndustry():Observable<Emails>
{
  return this.http.get<Emails>(this.url+'findByIndustry');
}

}
