import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Registration } from '../home/Registration';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSubscription!: Subscription;
  userName! : string;
  reg! : Registration;
  isLoading : boolean = false;
  constructor(private auth : AuthenticationService) { }

  ngOnInit(): void {
    this.auth.checkAuth();
   this.fetchUserName();
   this.userInfo();
  }


  async fetchUserName(){
    this.userSubscription = await this.auth.getuserName().subscribe(res=>{ this.userName = res;console.log(this.userName);});
  }

  async userInfo()
  {
    await this.auth.fetchUserInfo(this.userName).subscribe(res=>this.reg = res);
  }





}
