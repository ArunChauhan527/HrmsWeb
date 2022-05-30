import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-module',
  templateUrl: './client-module.component.html',
  styleUrls: ['./client-module.component.css']
})
export class ClientModuleComponent implements OnInit {

  register : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  registerAdmin(){
    this.register = true;
  }
}
