import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LoginComponent } from './component/login/login.component';
import { AttandanceComponent } from './modules/attandance/attandance.component';
import { ClientModuleComponent } from './modules/client-module/client-module.component';
import { ConfigComponent } from './modules/config/config.component';
import { HomeComponent } from './modules/home/home.component';
import { LeaveComponent } from './modules/leave/leave.component';
import { PayrollComponent } from './modules/payroll/payroll.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';
import { ReimbursementComponent } from './modules/reimbursement/reimbursement.component';
import { SalaryComponent } from './modules/salary/salary.component';

const routes: Routes = [
  {
    path : "", component: LoginComponent
  }, 
   {
    path : "dashboard" , component: DashboardComponent,
    children:[
      {
      path:"home",
      component: HomeComponent
    },
    {
      path: "leave",
      component: LeaveComponent
    },
    {
      path: "attandance",
      component: AttandanceComponent
    },
    {
      path:"payroll",
      component: PayrollComponent
    },
    {
      path:"register",
      component : RegisterComponent
    },
    {
      path:"reimbursement",
      component : ReimbursementComponent 
    },
    {
      path: "profile",
      component: ProfileComponent
    },
    {
      path: "settings",
      component: ConfigComponent
    },
    {
      path:"client",
      component: ClientModuleComponent
    },
    {
      path:"changePassword",
      component:ChangePasswordComponent
    },
    {
      path : "salary",
      component: SalaryComponent
    }
  ]
},
{
  path:"logout",
  component:LoginComponent
},
{
  path:"forget",
  component:ForgetPasswordComponent
},
{
  path:"changePassword",
  component:ChangePasswordComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
