import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router: Router, private snakBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  forgetPassword(email : string){
    console.log(email);
    this.auth.forgetEmail(email).subscribe({error: (err)=>{
      this.snakBar.open(err.error.message,'okay');    },complete:()=>{
        this.snakBar.open('Otp is send to your email','okay');
        this.router.navigate(['/']);
      }});
    
  }

}
