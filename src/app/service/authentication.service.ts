import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from '../component/login/Login';
import { Token } from '../component/login/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url  = environment.url;
  token: any;
  constructor(private http: HttpClient, private router: Router) { }

login(login :Login){
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

}
