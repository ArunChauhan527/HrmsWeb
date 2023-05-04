import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptionService } from 'src/app/service/encryption.service';
import { Registration } from '../home/Registration';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { ExcelServiceService } from 'src/app/service/excel-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/service/admin-service.service';

export interface DialogData
{
  message : string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentFile!: File;
  progress = 0;
  message = '';
  fileName = 'Select File';
  fileInfos?: Observable<any>;
  list : boolean = false; 
  bulk: boolean = false;
  empList : Registration[] = [];
  userName = "";
  industry = "";
  page =0;
  size=5;
  length =0;
  isLoading = true;
  email : string='';
  joinDate : string ='';
  department : string ='';
  emails : string[] = [];
  departments : string[] = [];
  
  userSubscription : Subscription = new Subscription();
  displayedColumns : string[] =['Sno','name','user','gender','designation','department','oEmail','status'];
  
  constructor(private auth : AuthenticationService, private active : ActivatedRoute,
     private encrypt : EncryptionService, private dialog: MatDialog, private excel : ExcelServiceService,
     private snakBar : MatSnackBar, private admin : AdminServiceService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
    this.active.queryParams.subscribe(res=>{this.industry = this.encrypt.decrypt(res['ind']);});
    this.fetchUserName();
    this.empRecords();
    this.searchByIndustry();
  }

  bulkEnable(){
    this.bulk = !this.bulk;
    this.list = false;
  }

  listEnable(){
    this.list = !this.list;
    this.bulk = true;
  }
  
  upload(){
    const reader = new FileReader();
    reader.readAsDataURL(this.currentFile);
    reader.onload = () =>{ console.log(reader.result)};
    const formData  = new FormData();
    formData.append('file', this.currentFile);
    formData.append('ind', this.industry);
    this.admin.saveBulkReg(formData).subscribe();
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
  async fetchUserName(){
    this.userSubscription = await this.auth.getuserName().subscribe(res=>{ this.userName = res;console.log(this.userName);});
  }

  empRecords(){
    this.auth.fetchAllUsers(this.page, this.size).subscribe({
      error : (err)=>{console.log(err)},
    next :(res)=>{ this.empList = res.content;
     this.length = res.totalElement;
     console.log(this.empList);
     this.isLoading=false;
    }});
      
  }
  pageEvent(event : any)
  {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.length = event.length;
    if(this.email !== '' || this.department !== '' || this.joinDate !== '')
    {
     this.searchEmp(this.email, this.department, this.joinDate);
    }
    else{
      this.empRecords();
    }
    
  }

  openDialog(event : any,  emp_code : number){
   const dialogRef = this.dialog.open(DialogComponent,{
       width : '250px',
       data:{message : 'Do you want to continue?'} 
    });

    dialogRef.afterClosed().subscribe(result=>{
        console.log('result on close', result, event.checked, !event.checked);
        console.log('events', event);
        event.source._checked = result === true ? event.checked : !event.checked;  
        const emp =  this.empList.filter(emp=>emp.emp_code === emp_code).values();
        const empL = emp.next().value;
        console.log(empL);
        if(event.source._checked && empL.status === 'DeActive')
        {
          empL.status = 'Active';
          empL.updatedDate = new Date();
          this.updateEmpl(empL);
        }
        else if(!event.source._checked && empL.status ==='Active' )
        {
         empL.status = 'DeActive';
         empL.updatedDate = new Date();
         this.updateEmpl(empL);
        }
        
    });
  }

   updateEmpl(reg : Registration)
   {
    this.auth.updateStatus(reg).subscribe({
    error: (err)=>{ console.log(err);}, 
    next : (value)=>{ 
      const index = this.empList.indexOf(this.empList.filter(emp=> emp.emp_code === value.emp_code).values().next().value); 
     this.empList[index]= value;
     console.log(this.empList);
    }});
   }

   downloadSampleReg()
   {
    this.excel.sampleSheet();
   }

   searchEmp(email : any, department  : any, joiningDate : string){
     console.log(email, department, joiningDate);
     this.page =0;
     this.email = email._value;
     this.department = department._value;
     this.joinDate = joiningDate;
     this.admin.searchEmp(email._value, department._value,joiningDate ===''?null:joiningDate, this.page, this.size).subscribe({error(err) {
       console.log(err);
     },
    next : (value)=> {
      this.empList = value.content;
      this.length = value.totalElement;
    },});
   }

   searchByIndustry()
   {
    this.admin.searchByIndustry().subscribe({next : (val)=>{
      this.emails = val.email;
      this.departments = val.department;
    }});
   }
}
