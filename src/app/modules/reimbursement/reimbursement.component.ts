import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {

  fileName = 'Select File';
  reimbursement: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns : string[] = ['Sno', 'Req.No', 'CreatedOn','UpdatedOn','Claimed','Approved','Reviewer','Remark','Status','Actions'];
  constructor() { }

  ngOnInit(): void {
  }

   pastReimbursement() {
     this.reimbursement = true;
    }
}
