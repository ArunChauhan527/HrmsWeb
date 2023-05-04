import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, ignoreElements, of, throwError } from 'rxjs';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptionService } from 'src/app/service/encryption.service';
import { ChangePassword } from './ChangePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  otp : boolean = false;
  offEmail : string ="";
  oldPassword ="";
  otpKey = "";
  userName="";
  forget = "";
  constructor(private snakBar : MatSnackBar, private router : Router, private admin: AdminServiceService,
     private auth : AuthenticationService, private activeRouter : ActivatedRoute, private encrypt: EncryptionService) { }
  
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(res=>{this.userName=res['user'];
      console.log(this.userName);
     this.forget = res['forget'];
     console.log(this.forget); 
    });
    if(this.userName!=='' && this.userName !==undefined)
    {
      this.auth.fetchUserInfo(this.userName).subscribe(res=>this.offEmail =res.officalEmailId);
    }
    else if(this.forget!=='')
    {
      this.offEmail =  this.encrypt.decrypt(this.forget);
      console.log(this.offEmail);
      this.otp = true;
    }
    
  }

  changePasswordByOld( newPassword: string, retype: string)
  {
    if(this.passwordValidation(newPassword))
    {
    if(newPassword===retype && this.oldPassword !== newPassword)
    {
   this.admin.changePassword(new ChangePassword(this.otpKey,this.oldPassword,newPassword,this.offEmail))
   .pipe(catchError(err=>{
     console.log('Handling error ', err.error.message); 
    return throwError(()=> new Error(err.error.message))})) 
   .subscribe({error: (err)=>{console.log('error message ', err ); this.snakBar.open(err,'okay');} 
   ,complete : ()=>{ this.snakBar.open('Password Changed SuccessFully','okay',{duration: 1000}); this.router.navigate(['/dashboard']); }
  });
    }
    else
    {
      if(this.oldPassword === newPassword)
      {
        this.snakBar.open("You can't choose new password same as old password",'okay');
      }else{
        this.snakBar.open("New Password and Retype password doesn't match",'okay');
      }
      
    }
   }
  }

  changePasswordByOtp( newPassword : string, retype: string)
  {
    if(this.passwordValidation(newPassword))
    {
    if(newPassword===retype)
    {
    this.admin.changePassword(new ChangePassword(this.otpKey,this.oldPassword,newPassword,this.offEmail))
    .pipe(catchError(err=>{
      console.log('Handling error ', err.error.message); 
     return throwError(()=> new Error(err.error.message))}))
     .subscribe({error: (err)=>{console.log('error message ', err ); this.snakBar.open(err,'okay'); 
     }, complete :()=>{ this.snakBar.open('Password Change SuccessFully','okay'); this.router.navigate(['/']);}});
    }
    else{
      this.snakBar.open("New Password and Retype password doesn't match",'okay'); 
    }
   }
  }

  passwordValidation(password: string):boolean{
   let flag = false;
   console.log(password.length);
    if(password.length >= 8 && password.length <= 16)
    {
    flag =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password);
    if(!flag)
    {
      this.snakBar.open("Password must contain alphabet, Special Character and number",'okay');
    }
    }
    else{
      this.snakBar.open("Password length can't less than 8 and more than 16 ",'okay');
      flag = false;
    }
   return flag;
  }

}
