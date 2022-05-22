import { Component, OnInit } from '@angular/core';
import { Attandance } from './AttandanceModel';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css']
})
export class AttandanceComponent implements OnInit {


  attandance!: Attandance[];
  punchIn : boolean =false;
  regulate : boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.attandance = [ new Attandance('1','9:00 AM','9:00 PM','10'), new  Attandance('1','9:00 AM','9:00 PM','10')];
  }

  OnpunchIn(){
    this.punchIn = true;
  }


  OnpunchOut(){}

  Onregulate(){
    this.regulate = true;
  }

}
