import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { menuList } from './MenuList';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  sideMenu = menuList;
  collapse = true;
  constructor(private home: HomeServiceService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    console.log('before : '+this.collapse);
    this.collapse = !this.collapse;
    console.log('after : '+this.collapse);
  }

  fetchModules()
  {
    this.home.fetchModule();
  }

}
