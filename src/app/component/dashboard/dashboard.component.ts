import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: any;
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
  }

 
}
