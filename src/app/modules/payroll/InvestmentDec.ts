export class InvestmentDec{

    public  uuid: number;
	public  ppf: number;
	public  houseRent: number;
	public  eduInterest: number;
	public  specialDonation: number;
	public  medicalInsurance: number;
	public  lta: number;
	public  annuityPlan: number;
	public  lifeInsurance: number;
	public  nsc: number;
	public  ssy: number;
	public  stampDregCharge: number;
	public  scss: number;
	public  tuitionFee: number;
	public  hlpr: number;
	public  elss: number;
	public  nps: number;
	public  homeLoan: number;
	public  industry: string;
	public  empCode: string;
	public  submittedDate: Date;
	public  updatedDate: Date;
    public updatedBy : string;

    constructor(uuid: number,
          ppf: number,
          houseRent: number,
          eduInterest: number,
          specialDonation: number,
          medicalInsurance: number,
          lta: number,
          annuityPlan: number,
          lifeInsurance: number,
          nsc: number,
          ssy: number,
          stampDregCharge: number,
          scss: number,
          tuitionFee: number,
          hlpr: number,
          elss: number,
          nps: number,
          homeLoan: number,
          industry: string,
          empCode: string,
          submittedDate: Date,
          updatedDate: Date,
          updatedBy : string
    ){

        this.uuid = uuid;
        this.annuityPlan = annuityPlan;
        this.eduInterest = eduInterest;
        this.elss = elss;
        this.empCode = empCode;
        this.hlpr = hlpr;
        this.homeLoan = homeLoan;
        this.houseRent = houseRent;
        this.industry = industry;
        this.lifeInsurance = lifeInsurance;
        this.lta = lta;
        this.medicalInsurance = medicalInsurance;
        this.nps = nps;
        this.nsc = nsc;
        this.ppf = ppf;
        this.scss = scss;
        this.specialDonation = specialDonation;
        this.ssy = ssy;
        this.stampDregCharge = stampDregCharge;
        this.submittedDate = submittedDate;
        this.tuitionFee = tuitionFee;
        this.updatedDate = updatedDate;
        this.updatedBy =updatedBy;
        }
}