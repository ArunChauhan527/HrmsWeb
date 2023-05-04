
export class Registration
{
    aadharcardno: number;
     address: string; 
     city : string; 
     createdDate : Date;
     department: string;
    designation : string; dob: string; emp_code : number; industry: string;
     joiningDate: Date; officalEmailId: string; pancard : string; password: string; personalEmailId: string;
     pincode : number; reportingManager: string; roleId : number;
     state: string; updatedDate: Date; userName: string;gender : string; firstName: string; lastName : string;
     status: string; tmpPass : boolean;
                         
    constructor(aadharcardno: number, address: string, city : string, createdDate : Date,
        department: string, designation : string, dob: string, emp_code : number, industry: string,
        joiningDate: Date, offical_email_id: string, pancard : string, password: string, personal_email_id: string,
        pincode : number, reportingManager: string, roleId : number,
        state: string, updatedDate: Date, userName: string, gender : string, firstName: string, lastName: string, stauts: string, tmpPass : boolean){
            this.aadharcardno= aadharcardno;
            this.address = address;
            this.city = city;
            this.createdDate = createdDate;
            this.department = department;
            this.designation = designation;
            this.dob = dob;
            this.emp_code = emp_code;
            this.industry = industry;
            this.joiningDate = joiningDate;
            this.officalEmailId = offical_email_id;
            this.pancard = pancard;
            this.password = password;
            this.personalEmailId = personal_email_id;
            this.pincode = pincode;
            this.reportingManager = reportingManager;
            this.roleId = roleId;
            this.state = state;
            this.updatedDate = updatedDate;
            this.userName = userName;
            this.gender = gender;
            this.firstName = firstName;
            this.lastName = lastName;
            this.status = stauts;
            this.tmpPass = tmpPass;

        }
}