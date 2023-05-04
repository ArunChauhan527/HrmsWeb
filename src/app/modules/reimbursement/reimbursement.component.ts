import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/service/authentication.service';

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
  constructor(private auth : AuthenticationService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
  }

   pastReimbursement() {
     this.reimbursement = true;
    }
}
