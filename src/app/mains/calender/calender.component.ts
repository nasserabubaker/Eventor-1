import { Component, OnInit } from '@angular/core';
import {EventService} from 'src/app/services/event.service'
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  events: any = [];
  id = 2;
  constructor(private eventserves: EventService) { }
  async ngOnInit(){
    this.eventserves.getAttendedEvents(this.id).subscribe(x => this.events = x);
 }

}
