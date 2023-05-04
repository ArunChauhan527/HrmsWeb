export class ChangePassword 
{
    otp:string;
    oldPassword:string;
    newPassword:string;
    emailId:string;

    constructor(otp:string, oldPassword:string, newPassword:string, emailId:string)
    {
        this.otp = otp;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.emailId = emailId;
    }
}