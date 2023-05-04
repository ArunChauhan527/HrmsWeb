export class Role {
    roleId : number;
    roleName: string;
    industry: string;
    createdBy:string;
    createdAt:Date; 

    constructor(roleId : number, roleName: string, industry: string, createdBy:string, createdAt:Date){
        this.roleId = roleId;
        this.roleName = roleName;
        this.industry = industry;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }
}