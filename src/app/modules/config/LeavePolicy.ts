export class LeavePolicy
{
    sno : number;
	created_by : string;
	updated_by : string;
	createdat : Date;
	updatedat : Date;
	paid_leave : number;
	casual_leave : number; 
	casual_carry_fd : string;
	paid_carry_fd : string;
	industry : string;

    constructor(sno : number,
        created_by : string,
        updated_by : string,
        createdat : Date,
        updatedat : Date,
        paid_leave : number,
        casual_leave : number, 
        casual_carry_fd : string,
        paid_carry_fd : string,
        industry : string)
        {
            this.sno = sno;
            this.created_by = created_by;
            this.updated_by = updated_by;
            this.createdat  = createdat;
            this.updatedat  = updatedat;
            this.paid_leave = paid_leave;
            this.casual_leave = casual_leave;
            this.casual_carry_fd = casual_carry_fd;
            this.paid_carry_fd = paid_carry_fd;
            this.industry = industry;
        }
}