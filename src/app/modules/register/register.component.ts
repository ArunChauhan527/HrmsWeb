import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Select File';
  fileInfos?: Observable<any>;
  
  bulk: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  bulkEnable(){
    this.bulk = true;
  }
  
  upload(){
    this.progress =100;
  }

  selectFile( event: any){
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

}
