import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Registration } from 'src/app/modules/home/Registration';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EncryptionService } from 'src/app/service/encryption.service';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { menuList } from './MenuList';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  sideMenu = menuList;
  collapse = true;
  collapseSub : Subscription = new Subscription();
  userSubscription!: Subscription;
  userName! : string;
  registration! : Registration;
  roleId : number =0;
  industry : string = '';
  constructor(private home: HomeServiceService, private auth : AuthenticationService, 
    private admin : AdminServiceService, private route: Router, private encrypt : EncryptionService) { 
  
  }
  

   ngOnInit(): void {
   // this.fetchModules();
    this.fetchUserName();
    this.collapseSub =  this.home.getSideBarStatus().subscribe(res=> this.collapse =res);
    console.log('username : ', this.userName);
     this.fetchUserInfo();
  }

  toggleSidebar() {
    console.log('before : '+this.collapse);
    this.collapse = !this.collapse;
    this.home.setSideBarStatus(this.collapse);
    console.log('after : '+this.collapse);
  }

  async fetchUserName(){
    this.userSubscription = await this.auth.getuserName().subscribe(res=>{ this.userName = res;console.log(this.userName);});
  }

  async fetchModules()
  {
   await this.home.fetchModule(this.roleId).subscribe(res=>{this.sideMenu = res; 
    this.auth.setCurrentRoute(res[0].route);  
    if(!this.route.url.includes(res[0].route))
    {
       this.route.navigate([this.route.url+'/'+res[0].route],);
      }
  });
  }

  async fetchUserInfo(){
   await this.auth.fetchUserInfo(this.userName).subscribe(res=> {
      this.registration =res;console.log(this.registration);
      this.roleId = res.roleId;
      this.industry = res.industry;
      if(res.tmpPass)
      {
        this.route.navigate(['changePassword'],{queryParams: {user: this.userName}});
      }
      else{
        this.fetchModules();
      }
      
    });
  }

  async fetchRoleInfo(){
    await this.admin.fetchRole(this.roleId).subscribe(res=>console.log('roleInfo : ',res));
  }

   routeMoudles(path : string){
     this.route.navigate(['/dashboard/'+path],{queryParams: {ind : this.encrypt.encrypt(this.industry)}});
   }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.collapseSub.unsubscribe();
  }

}
