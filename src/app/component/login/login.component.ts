import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Login } from './Login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(username: string, password:string){
     console.log('username :'+ username);
    this.auth.login(new Login(username, password)).subscribe(res=>
      {console.log(res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);},
        err=>{
          console.log('error while login ', err);
          this._snackBar.open('Error while login', 'Okay',{duration: 5000} );
        }
      );
    
  }
}
