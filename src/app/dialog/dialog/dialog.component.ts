import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/modules/register/register.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  constructor( private dialogRef : MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

     onNoClick():void{
       this.dialogRef.close();
     }
}
