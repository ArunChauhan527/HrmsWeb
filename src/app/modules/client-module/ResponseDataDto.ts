export class ResponseDataDto
{
    totalElement : number;
    content : any[];
    constructor(totalElement : number , content : any[] ){
     this.totalElement = totalElement;
     this.content = content;
    }
}