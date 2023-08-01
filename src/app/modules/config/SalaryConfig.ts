export class SalaryConfig{

    hra : number;
    lta : number;
    ca  : number;
    medR: number;
    pf  : number;
    epf : number;
    id  : number;
    industry : string;
    createdDate : Date;
    updatedDate : Date;
    updatedBy : string;
    createdBy : string; 
    constructor(hra : number, lta : number, ca : number,
        medR : number, pf : number, epf : number, id : number, industry : string, 
        createdDate : Date, updatedDate : Date, updatedBy : string, createdBy : string){
     this.hra = hra;
     this.lta = lta;
     this.ca  = ca;
     this.medR = medR;
     this.pf = pf;
     this.epf = epf;
     this.id = id;
     this.industry = industry;
     this.createdDate = createdDate;
     this.updatedBy = updatedBy;
     this.updatedDate = updatedDate; 
     this.createdBy = createdBy;
    }
}