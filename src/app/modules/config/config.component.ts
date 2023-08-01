import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'src/app/component/side-bar/MenuList';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LeaveServiceService } from 'src/app/service/leave-service.service';
import { Registration } from '../home/Registration';
import { Config } from './Config';
import { LeavePolicy } from './LeavePolicy';
import { menuList } from 'src/app/component/side-bar/MenuList';
import { ExcelServiceService } from 'src/app/service/excel-service.service';
import { SalaryConfig } from './SalaryConfig';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryConfigService } from 'src/app/service/salary-config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  leaveConfig : boolean =  false;
  natHoliday  : boolean =  false;
  progress = 0;
  message = '';
  ModuleList : MenuItem[] = [];
  fileName = 'Select File';
  currentFile!: File;
  config : Config[] =[];
  reg! : Registration;
  userName ="";
  industry="";
  page: number = 0;
  size: number = 5;
  length : number =0;
  Loading: boolean = true; 
  leavePolicy! : LeavePolicy;
  edit : boolean = false;
  menu : MenuItem[] = menuList;


  displayedColumns : string[] = ['roleId', 'roleName', 'accessModule','access','createdBy','updatedBy', 'createdat','updatedat'];
  constructor(private admin: AdminServiceService, private auth : AuthenticationService,
     private snakBar : MatSnackBar, private leave : LeaveServiceService, private excel : ExcelServiceService,
     private salaryConfigService : SalaryConfigService) { }

  ngOnInit(): void {
    console.log(this.menu);
    this.auth.checkAuth();
    this.auth.getuserName().subscribe(res=> this.userName=res);
    this.fetchModules();
    this.fetchUserInfo();
  }

  fetchModules(){
   this.admin.fetchModule().subscribe(res=> this.ModuleList = res);
  }

  setleaveConfig(){
    this.leaveConfig = !this.leaveConfig;
  }

  setNationalHol(){
    this.natHoliday = !this.natHoliday;
    this.leaveConfig = !this.leaveConfig;
   console.log(this.leaveConfig, this.natHoliday);

  }

  saveConfig(roleName : string, modules : any, access : any)  {
    console.log(roleName, modules._value, access._value, this.userName);
    if(roleName!=='' && modules._value.length !==0 && access._value.length !==0)
    {
      this.admin.saveRole(new Config(0, roleName, modules._value.map((x : string)=>x).join(","), JSON.parse(access._value.toLowerCase()), this.userName, this.userName, new Date(), new Date(), this.industry, false)).subscribe(res=>this.fetchAdmin(''));
    }
    else{
      this.snakBar.open('Please fill all required Fields','okay');
    }
  }


  async fetchUserInfo(){
    await this.auth.fetchUserInfo(this.userName).subscribe(res=> {
       this.userName = res.userName;
       this.industry = res.industry;
       this.fetchAdmin('');
       this.fetchLeavePolicy();
     });
   }
 
  async fetchAdmin(role : string){
    await this.admin.getRole(role,this.page,this.size).subscribe({next : (value)=>{
     this.config = value.content;
      this.length = value.totalElement;
      this.Loading = false;
    } 
    });
  } 

  searchRole(role : any){
    if(role.target.value.length >2 || role.target.value.length === 0)
    {
     this.fetchAdmin(role.target.value);
     }
  }
  
  pageEvent(event : any)
 {
   this.size = event.pageSize;
   this.page = event.pageIndex;
   this.length = event.length;
   this.fetchAdmin('');
 }

  fetchLeavePolicy()
  {
   this.leave.getLeavePolicy().subscribe(
    {error : (err)=>{ console.log(err); this.snakBar.open('Something went wrong','okay');} 
    ,next : (value)=> {
       this.leavePolicy = value;
       console.log(this.leavePolicy);
    },
    }
    );
  }
  setEdit(){
    this.edit = !this.edit;
  }

  saveLeaveConfig( pLeave : string, cLeave: string, ccarryFwd : string, cpaidFwd : string){

    console.log(pLeave, cLeave,ccarryFwd, cpaidFwd);
    let leave ;
    if(!this.leavePolicy)
    {
      leave = new LeavePolicy(0, this.userName, this.userName,new Date(), new Date(),Number(pLeave), Number(cLeave), ccarryFwd, cpaidFwd, this.industry);
    }
    else
    {
      leave = new LeavePolicy(0, this.leavePolicy.created_by , this.userName, this.leavePolicy.createdat, new Date(),Number(pLeave), Number(cLeave), ccarryFwd, cpaidFwd, this.industry);
    }
   this.leave.saveLeavePolicy(leave).
   subscribe({error :(err)=>{ this.snakBar.open('Something went wrong whiel saving policy','okay'); console.log(err);},
  complete :()=> {
    this.fetchLeavePolicy();
  },});

  }
  upload(){
    const reader = new FileReader();
    reader.readAsDataURL(this.currentFile);
    reader.onload = () =>{ console.log(reader.result)};
    const formData  = new FormData();
    formData.append('file', this.currentFile);
    formData.append('ind', this.industry);
    this.progress =100;
  }

  selectFile( event: any){
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      
      let fileExtn =  file.name.split('.')[1];
      if(fileExtn === 'xlsx' || fileExtn === 'xls'  || fileExtn === 'csv')
         {
          this.currentFile = file;
          this.fileName = this.currentFile.name;      
         }
         else{
          this.snakBar.open('Invalid File Format','okay');
          this.fileName = 'Select File';
         }
        } else {
      this.fileName = 'Select File';
    }
  }
  
  downloadSampleNationalHoliday(){
    this.excel.sampleNationalSheet();
  }

}
