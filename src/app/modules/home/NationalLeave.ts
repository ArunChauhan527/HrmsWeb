export class NationalHoliday
{
    sno: number;
    holiday : string;
    occuredDate : Date;
	region : string;
	department : string;
	company : string;
	industry : string;

    constructor(sno : number, holiday: string, occuredDate: Date, region : string,
         department: string, company: string, industry : string){
       this.sno = sno;
       this.holiday = holiday;
       this.occuredDate = occuredDate;
       this.region = region;
       this.department = department;
       this.company = company;
       this.industry = industry;
    }
}