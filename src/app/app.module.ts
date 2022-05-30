import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { LoginComponent } from './component/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule} from '@angular/material/card';
import { LeaveComponent } from './modules/leave/leave.component';
import { AttandanceComponent } from './modules/attandance/attandance.component';
import { PayrollComponent } from './modules/payroll/payroll.component';
import { HomeComponent } from './modules/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { RegisterComponent } from './modules/register/register.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReimbursementComponent } from './modules/reimbursement/reimbursement.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './modules/profile/profile.component';
import { ConfigComponent } from './modules/config/config.component';
import {  HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopBarComponent,
    SideBarComponent,
    LoginComponent,
    LeaveComponent,
    AttandanceComponent,
    PayrollComponent,
    HomeComponent,
    RegisterComponent,
    ReimbursementComponent,
    ProfileComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgbModule,
    NgChartsModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
