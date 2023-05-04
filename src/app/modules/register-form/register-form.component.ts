import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptionService } from 'src/app/service/encryption.service';
import { Client } from '../client-module/Client';
import { Config } from '../config/Config';
import { Registration } from '../home/Registration';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  client : boolean = false;
  searchedClient : Client[] =[];
  auto: any;
  previousSearch : string = '';
  inputControl = new  FormControl();
  role : string = '';
  gender: string ='';
  username : boolean = false;
  reg! : Registration;
  industry ="";
  roleSearch : Config[] =[];
  constructor(private auth: AuthenticationService, private admin : AdminServiceService,
     private snakBar : MatSnackBar, private active : ActivatedRoute, private encrypt : EncryptionService) { }

  ngOnInit(): void {
    this.active.queryParams.subscribe(res=>{ this.industry = this.encrypt.decrypt(res['ind']); console.log(this.industry)});
   this.admin.fetchClientStatus().subscribe(res=>{this.client = res; console.log(this.client); if(!this.client){ this.searchRole('');} });
   this.inputControl.valueChanges.subscribe((val : string)=>{ 
    this.getClient(val);
  });
  }

  getClient(client : string){
    console.log('client', client);
    if(client !=='')
    {
    this.admin.getAllClient(client).subscribe(res=> this.searchedClient=res); 
    }
   }


   registerUser(empName: string,lastName: string,officalEmail: string,personalEmail: string,
    dob: string,designation: string,department: string,address: string,city: string,state: string,
    pinCode: string,panCard: string,aadharCard: string,reportingManager: string,joinigDate: string){
      console.log(this.role);

      if(this.client)
      {
      this.searchedClient.filter(res=>{if(res.company===this.inputControl.value){
       this.industry = res.industry;
        }});
      }
      
       const reg  = new Registration(Number(aadharCard),address,city,new Date(),department,designation
      ,dob,0,this.industry,new Date(joinigDate),officalEmail,panCard,'',personalEmail,Number(pinCode),reportingManager,
      Number(this.role),state,new Date(),'',this.gender, empName, lastName, 'Active', false);
      console.log(reg);
      console.log(officalEmail , personalEmail);
      if(this.industry!==''  && officalEmail!=='' && empName !=='' &&(!this.client ||(this.client && this.role!=='')))
      {
        this.auth.saveRegistration(reg).subscribe(res=>{
          this.snakBar.open(res.message,'Okay',{duration: 5000});
        });
      }
      else
      {
        this.snakBar.open('Please fill all required filled','okay');
      }
       

    }

   async usernameExist(userName : string){
   await this.auth.fetchUserInfo(userName).subscribe(res=>{if(res!=null){
       if(res.userName===userName){this.username=true; this.snakBar.open('Username already exist choose another','okay');}  
      }else{this.username=false;}});
    }

    searchRole( roleName : string){
      console.log('from searchRole : ', roleName);
        this.admin.getRole(roleName,0,50).subscribe({error: (err)=>{
           console.log(err);
        }, next : (value)=> {
          this.roleSearch = value.content; 
          console.log(this.roleSearch);
        }, });
    }

}
