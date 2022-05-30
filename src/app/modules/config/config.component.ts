import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/component/side-bar/MenuList';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  ModuleList! : MenuItem[];
  constructor(private admin: AdminServiceService) { }

  ngOnInit(): void {
    this.fetchModules();
  }

  fetchModules(){
   this.admin.fetchModule().subscribe(res=> this.ModuleList = res);
  }


}
