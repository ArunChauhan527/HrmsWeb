export class Client
{
    clientId : string;
    industry : string;
    company  : string; 
    shortForm: string;
    createdAt: Date;

    constructor(clientId: string, industry : string, company: string, shortForm :   string, createdAt : Date){
    this.clientId = clientId;
    this.industry = industry;
    this.company  = company;
    this.shortForm= shortForm;
    this.createdAt= createdAt;
    }
}