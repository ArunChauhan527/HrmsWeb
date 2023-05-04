export class LeaveCount{

    plannedLeave : number;
    casualLeave  : number;
    approvedLeave : number;
    unapprovedLeave :number;
    appliedLeave   : number; 

    constructor(plannedLeave : number, casualLeave : number, approvedLeave : number, unapprovedLeave : number,
        appliedLeave : number){
            this.plannedLeave = plannedLeave;
            this.casualLeave  = casualLeave;
            this.approvedLeave = approvedLeave;
            this.unapprovedLeave = unapprovedLeave;
            this.appliedLeave = appliedLeave;
        }

}