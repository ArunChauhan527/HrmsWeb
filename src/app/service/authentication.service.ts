import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../component/login/Login';
import { Token } from '../component/login/Token';
import { ResponseDataDto } from '../modules/client-module/ResponseDataDto';
import { Registration } from '../modules/home/Registration';
import { ResponseDto } from '../modules/register-form/ResponseDto';
import { RefreshToken } from '../component/login/RefreshTokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url  = environment.url;
  token: any;
  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private regSubject! : BehaviorSubject<Registration>;
  private route: BehaviorSubject<string> = new BehaviorSubject<string>(''); 
  constructor(private http: HttpClient, private router: Router) { }

login(login :Login){
  this.userSubject.next(login.username);
localStorage.setItem('username', login.username);

return this.http.post<Token>(this.url+'getToken',login);
}


checkAuth(){
  this.token  = localStorage.getItem('token');
    if(!this.token)
    {
      console.log('No token available', this.token);
      this.router.navigate(['/']);
    }
}

getuserName(): Observable<any>{
  if(!this.userSubject.getValue())
  {
     this.userSubject.next(localStorage.getItem('username')+'')
  }
  return this.userSubject.asObservable();
  
}

fetchUserInfo(username: string): Observable<Registration>{
return this.http.get<Registration>(this.url+'getUserInfo?userName='+username);
}

saveRegistration(registration: Registration){
return this.http.post<ResponseDto>(this.url+'register',registration);
}

setCurrentRoute(route :string){
 this.route.next(route);
}

getCurrentRoute(): Observable<string>
{
  return this.route.asObservable();
}

forgetEmail(email:string)
{
  return this.http.get(this.url+'forgetPassword?emailId='+email);
}

fetchAllUsers(page : number, size : number):Observable<ResponseDataDto>
{
  return this.http.get<ResponseDataDto>(this.url +'getUsers?page='+page+'&size='+size);
}

updateStatus(reg : Registration) : Observable<Registration>
{
return this.http.post<Registration>(this.url+'updateStatus',reg); 
}

refreshToken(refreshToken : RefreshToken): Observable<Token>{
  return this.http.post<Token>(this.url+'refreshToken',refreshToken);
}

}
