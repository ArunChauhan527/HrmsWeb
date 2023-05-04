import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvestmentDec } from '../modules/payroll/InvestmentDec';
import { mode } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PayrollServiceService {

  url = environment.url;
  constructor( private http: HttpClient) { }

  saveInvestMentDeclaration(model : InvestmentDec){
   this.http.post(this.url+'saveAndUpdate', model);
  }

}
