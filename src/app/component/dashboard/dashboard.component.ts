import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: any;
  constructor(private auth: AuthenticationService , private router : Router)  { }

  ngOnInit(): void {
    this.auth.checkAuth();
    console.log(this.router.url);
    if(this.router.url === '/dashboard')
    {
      this.router.navigate([this.router.url+"/"+this.auth.getCurrentRoute()]);
    }

  }

 
}
