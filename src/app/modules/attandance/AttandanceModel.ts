export class Attandance
{
    empId : string;
    punchIn : string;
    punchOut : string;
    value : string;

    constructor(empId: string, punchIn : string, punchOut : string, value : string){
      this.empId = empId;
      this.punchIn = punchIn;
      this.punchOut = punchOut;
      this.value = value;
    }
}