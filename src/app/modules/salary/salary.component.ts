import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryConfig } from '../config/SalaryConfig';
import { SalaryConfigService } from 'src/app/service/salary-config.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EmpInfo } from './EmpInfo';
import { PayrollServiceService } from 'src/app/service/payroll-service.service';
import { PercentPipe } from '@angular/common';
import { PercentagePipe } from 'src/app/Pipe/percentage.pipe';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  panelOpenState = false;
  public salaryConfig! : FormGroup;
  public salary! : FormGroup;
  public monthlySalary! : FormGroup;
  public earning! : FormGroup;
  public deduction! : FormGroup;
  
  valid = Validators.pattern("[0-9]{0,6}");
  empInfo! : EmpInfo[];
  salaryconfig! : SalaryConfig;
  percentage = new PercentagePipe();
  constructor(private auth : AuthenticationService, private salaryConfigService : SalaryConfigService,
    private payroll : PayrollServiceService) { }



  ngOnInit(): void {
    this.auth.checkAuth();
    this.salaryConfig = new FormGroup({
      id : new FormControl(null),
      hra : new FormControl(0, this.valid),
      lta : new FormControl(0, this.valid),
      ca : new FormControl(0, this.valid),
      medR : new FormControl(0, this.valid),
      pf : new FormControl(0, this.valid),
      epf : new FormControl(0, this.valid),
      industry : new FormControl(''),
      createdDate : new FormControl(new Date()),
      updatedDate : new FormControl(new Date()),
      updatedBy : new FormControl(''),
      createdBy : new FormControl('')
 
     });

     //salary formGroup initialization
     this.salary  = this.monthlySalary = new FormGroup({
      //earning formGroup initialization
      earning:this.earning = new FormGroup({
      id: new FormControl(null),
      empCode : new FormControl(null),
      basic : new FormControl(0, this.valid),
      hra : new FormControl(0, this.valid),
      conveyanceAllowance : new FormControl(0, this.valid),
      nightShiftAllowance : new FormControl(0, this.valid),
      specialAllowance : new FormControl(0, this.valid),
      medicalReimbursement : new FormControl(0, this.valid),
      telephoneReimbursement : new FormControl(0, this.valid),
      uniformAllowance : new FormControl(0, this.valid),
      mealCoupons : new FormControl(0, this.valid),
      lta : new FormControl(0, this.valid),
      childrenEduAllowance : new FormControl(0, this.valid),
      carRunningMaintenance : new FormControl(0, this.valid),
      arrears : new FormControl(0, this.valid),
      createdDate : new FormControl(0, this.valid),
      updatedDate : new FormControl(0, this.valid),
      updatedBy : new FormControl(0, this.valid),
      industry : new FormControl(null),
     }),
     //deduction formGroup initalization
     deduction:this.deduction = new FormGroup({
      id: new FormControl(null),
      empCode : new FormControl(null),
      tds : new FormControl(0, this.valid),
      pf : new FormControl(0, this.valid),
      mealCouponsDeductions : new FormControl(0, this.valid),
      employerPF : new FormControl(0, this.valid),
      loanAdvance : new FormControl(0, this.valid),
      otherDeduction : new FormControl(0, this.valid),
      createdDate : new FormControl(0, this.valid),
      updatedDate : new FormControl(0, this.valid),
      updatedBy : new FormControl(0, this.valid),
      industry : new FormControl(null),
     })
    }),
     this.fetchSalaryConfig();
    
  }



  salaryConfigSubmit(){
    if(this.salaryConfig.valid){
      console.log(this.salaryConfig.value as SalaryConfig);
      this.salaryConfigService.saveConfig(this.salaryConfig.value as SalaryConfig).subscribe(res=>console.log(res));
    }
    else{
      console.log(this.salaryConfig.errors)
      console.log("Inside invalid")
    }
  }

   findEmp(event:Event){
    console.log((event.target as HTMLInputElement).value);
    var name=(event.target as HTMLInputElement).value;
    this.salaryConfigService.getEmpInfo(name).subscribe(res=>{
      this.empInfo = res;
    });
   }

   fetchEarning(value:string){
    console.log("selected value is ", value);
     this.payroll.fetchEmpInfo(value).subscribe(res=>{
        console.log(res);
     });
   }

   saveSalary(){
    if(this.salary.valid)
    {
     console.log(this.salary.value)
    }
    else{
      console.log(this.salary.errors)
    }
   }

   fetchSalaryConfig(){
    this.salaryConfigService.getConfig().subscribe(res=>{
      this.salaryconfig = res;
      this.salaryConfig.patchValue({
         id: res.id,
         hra : res.hra,
         lta : res.lta,
         ca : res.ca,
         medR : res.medR,
         pf: res.pf,
         epf : res.epf,
         industry : res.industry,
         createdDate : res.createdDate,
      updatedDate : res.updatedDate,
      updatedBy : res.updatedBy,
      createdBy : res.createdBy
      });
    });

   }

   suggestedSalary(event  : Event){
    var basic = (event.target as HTMLInputElement).value as unknown as number;
    console.log(this.salaryconfig.medR)
      this.earning.patchValue({
       hra :  this.percentage.transform(basic, this.salaryconfig.hra),
       lta :  this.percentage.transform(basic, this.salaryconfig.lta),
       conveyanceAllowance : this.percentage.transform(basic, this.salaryconfig.ca),
       medicalReimbursement : this.percentage.transform(basic, this.percentage.transform(basic, this.salaryconfig.medR)),
      });

      this.deduction.patchValue({
         pf : this.percentage.transform(basic, this.salaryconfig.pf),
         employerPF: this.salaryconfig.epf
      });
   }

}
