import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {


   header = ["First Name", "Last Name", "Offical EmailId", "Personal EmailId", "Date Of Birth", "Gender","Joining Date",
  "Designation", "Department", "Address", "City", "State", "PinCode", "PanCard", "AadharCardNo",
   "Reporting Manager"]
   nationalHeader = ["Holiday's Name","Date","Region","Department"];
  constructor() { }

  sampleSheet(){
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Employee's List");
    let headerRow  = worksheet.addRow(this.header);
    headerRow.eachCell((cell,number)=>{
     cell.fill = {
      type : 'pattern',
      pattern: 'solid',
      fgColor: { argb : 'FFFFFF00'},
      bgColor :{ argb : 'FF0000FF'}
     }
     cell.border = {top : {style : 'thin'}, bottom : {style : 'thin'}, left : {style : 'thin'}, right : {style :'thin'}}
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Registration.xlsx');
});
  }

  sampleNationalSheet(){
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("National Holiday");
    let headerRow  = worksheet.addRow(this.nationalHeader);
    headerRow.eachCell((cell,number)=>{
      cell.fill = {
       type : 'pattern',
       pattern: 'solid',
       fgColor: { argb : 'FFFFFF00'},
       bgColor :{ argb : 'FF0000FF'}
      }
      cell.border = {top : {style : 'thin'}, bottom : {style : 'thin'}, left : {style : 'thin'}, right : {style :'thin'}}
     });
 
     workbook.xlsx.writeBuffer().then((data) => {
       let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
       fs.saveAs(blob, 'NationalHoliday.xlsx');
    });
  }


}
