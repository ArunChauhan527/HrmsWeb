import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Client } from './Client';
import { ClientDto } from './ClientDto';

@Component({
  selector: 'app-client-module',
  templateUrl: './client-module.component.html',
  styleUrls: ['./client-module.component.css']
})
export class ClientModuleComponent implements OnInit {

  register : boolean = false;
  industry! : string ;
  regClient : boolean = false;
  client : boolean = true;
  createdClient!: Client;
  isLoading : boolean = false;
  renderclient : ClientDto[] =[];
  pageSize : number= 5;
  length : number =0;
  pageIndex : number =0;
  searchParam : string ='';
  displayedColumns : string[] = ['clientId', 'company', 'shortForm','createdAt','hrAdmin','createAt'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private admin : AdminServiceService, private auth : AuthenticationService, private snakBar : MatSnackBar) { }

  ngOnInit(): void {
    this.auth.checkAuth();
    this.updateClientStatus();
    this.fetchIndustry();
    this.renderClient('',this.pageIndex,this.pageSize);
  }

  registerAdmin(){
    this.register = !this.register;
  } 

  saveClient(clientName : string, shrtName: string ){
    if(clientName!=='' && shrtName !==''){
     this.admin.saveClient(new Client('',this.industry,clientName,shrtName,new Date()))
     .subscribe(res=>{
       console.log('client saved properly');
       this.isLoading=false;
       this.renderClient('',this.pageIndex,this.pageSize);
       this.fetchIndustry();
       this.snakBar.open('Client saved successFully', 'Okay',{duration: 5000} );

     },
      err=>{
        this.snakBar.open('Error while saving cleint', 'Okay',{duration: 5000} );
        console.log('error while saving cleint', err);
      });
    }
    else{
      this.snakBar.open('Please Filled all required fields','okay');
    }
  }

  fetchIndustry(){
    this.admin.fetchIndustry().subscribe(res=>this.industry=res);
  }

  updateClientStatus(){
    this.admin.updateClientStatus(this.client);
  }

  renderClient(searchParam : string , page:  number, size: number){
    this.admin.getClient(searchParam, page, size).subscribe(res=>{
      this.renderclient = res.content;
      this.isLoading = true;
      this.length = res.totalElement; 
    });
 }
  
 createClient(){
  this.regClient = !this.regClient
  this.register = false;
 }

 pageEvent(event : any)
 {
   this.pageSize = event.pageSize;
   this.pageIndex = event.pageIndex;
   this.length = event.length;
   this.renderClient(this.searchParam, event.pageIndex, event.pageSize);
 }

 searchCompany(event: any)
 {
   console.log(event.target.value.length);
  if(event.target.value.length >2 || event.target.value.length ==0)
  {
    this.searchParam =event.target.value;
    this.isLoading = false;
    this.renderClient(this.searchParam,this.pageIndex, this.pageSize);
  }
   
   
 }

}
