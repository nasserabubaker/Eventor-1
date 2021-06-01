import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private eventservice:EventService) { }
  members: any = [];
   ngOnInit() {
     this.eventservice.getAllUsers().subscribe(x   => { console.log(x); this.members = x; })
  }
  onDelete(id:string) {
    alert(id);
  }

}
