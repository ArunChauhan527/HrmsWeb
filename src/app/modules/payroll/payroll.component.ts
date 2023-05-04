import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { InvestmentDec } from './InvestmentDec';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayrollServiceService } from 'src/app/service/payroll-service.service';
import { Chart, ChartType } from 'chart.js';
 
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit, AfterViewInit {

  constructor( private auth : AuthenticationService, private formBuilder : FormBuilder, private payroll: PayrollServiceService ) { }

  public investmentDec!: FormGroup; 
  valid = Validators.pattern("[0-9]{0,6}");
  public chartType : ChartType = 'doughnut';
  public chart! : Chart;
  @ViewChild('Salary')salary: any;
  
  ngOnInit(): void {
    this.auth.checkAuth();
    this.investmentDec = new FormGroup(
      {
        uuid : new FormControl(null),
        ppf : new FormControl(0,this.valid),
        houseRent :new FormControl(0,this.valid),
        eduInterest : new FormControl(0,this.valid),
        specialDonation : new FormControl(0, this.valid),
        medicalInsurance : new FormControl(0, this.valid),
        lta : new FormControl(0, this.valid),
        annuityPlan : new FormControl(0, this.valid),
        lifeInsurance : new FormControl(0, this.valid),
        nsc : new FormControl(0, this.valid),
        ssy : new FormControl(0, this.valid),
        stampDregCharge : new FormControl(0, this.valid),
        scss : new FormControl(0, this.valid),
        tuitionFee : new FormControl(0, this.valid),
        hlpr : new FormControl(0, this.valid),
        elss : new FormControl(0, this.valid),
        nps : new FormControl(0, this.valid),
        homeLoan : new FormControl(0, this.valid),
        industry :new FormControl(''),
        empCode :new FormControl(''),
        submittedDate : new FormControl(new Date()),
        updatedDate : new FormControl(new Date()),
        updatedBy : new FormControl('')
      }, {validators : this.valid}
    );
    
  }

  ngAfterViewInit(){
    this.salarySlipChart();
  }

  get f(){
    return this.investmentDec.controls;
  }

  onSubmit(){

    console.log(this.investmentDec.value);
    if(this.investmentDec.valid)
    {
    this.payroll.saveInvestMentDeclaration(this.investmentDec.value as InvestmentDec);
    }
    else{
     return;
    }
  }

  salarySlipChart(){
     let ctx : CanvasRenderingContext2D = this.salary.nativeElement.getContext('2d');
      this.chart = new Chart(ctx,{
        data : this.chartData(),
        type : this.chartType
      } );
     
  }

  chartData(){
   var data =  {
      labels : ['Take Home Salary', 'Deduction','Gross Salary'],
      datasets :[{
        data: [10000,1000,11000],
        backgroundColor : ['green', 'red', 'blue'],
        hoverOffset :4
      }]
    };
    return data;
  }
   
}
