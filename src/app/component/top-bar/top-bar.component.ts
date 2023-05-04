import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HomeServiceService } from 'src/app/service/home-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  collapse = true;
  collapseSub : Subscription = new Subscription();
  userSubscriber : Subscription = new Subscription();
  userName ="";
  constructor(private router : Router , private home: HomeServiceService, private auth : AuthenticationService) { }

  ngOnInit(): void {
   this.collapseSub = this.home.getSideBarStatus().subscribe(res=> this.collapse =res);
   this.fetchUserName();
  }


  async fetchUserName(){
    this.userSubscriber = await this.auth.getuserName().subscribe(res=>{ this.userName = res;console.log(this.userName);});
  }

  toggleSidebar() {
    console.log('before : '+this.collapse);
    this.collapse = !this.collapse;
    this.home.setSideBarStatus(this.collapse);
    console.log('after : '+this.collapse);
  }

  logout(){
    console.log('logout');
    console.log(this.router.url);
    localStorage.setItem('token','');
   this.router.navigate(['/logout']);
  }

  changePassword(){
    this.router.navigate(['/dashboard/changePassword'],{queryParams :{user:this.userName}});
  }

}
