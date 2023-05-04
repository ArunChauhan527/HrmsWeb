export class Config 
{

     roleId :number;
	 roleName : string;
	 accessModule : string;
	 accessApproval : boolean ;
	 createdBy : string;
	 updatedBy : string;
	 createdat : Date;
	 updatedat : Date;
	 industry : string;
     defaultRole : boolean;
  constructor(roleId :number,    roleName : string,
    accessModule : string,
    accessApproval : boolean,
    createdBy : string,
    updatedBy : string,
    createdat : Date,
    updatedat : Date,
    industry : string,
    defaultRole : boolean){
        this.roleId = roleId;
        this.roleName = roleName;
        this.accessModule = accessModule;
        this.accessApproval = accessApproval;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdat = createdat;
        this.updatedat = updatedat;
        this.industry  = industry;
        this.defaultRole = defaultRole;
    }
}