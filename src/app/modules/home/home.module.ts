import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
//import { HomeComponentRouting } from './home-component.module';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations:[HomeComponent],
    imports:[
        CommonModule,
       // HomeComponentRouting, 
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgChartsModule
    ]
})

export class HomeModule {}