import {  Component, Input, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-calender-component',
  templateUrl: './calender-component.component.html',
  styleUrls: ['./calender-component.component.css']
})
export class CalenderComponentComponent implements OnInit {
  events: any = [];
  Dates: any = [];
  date: Date = new Date("6/8/2021");
  id = 2;
  constructor(private eventserves: EventService) { }
   ngOnInit(){
     this.eventserves.getAttendedEvents(this.id).subscribe(x => { this.events = x; console.log(x)});
   }

  getDDate(date: Date) {
    if(!date){
      return "Undefined";
    }
    var x = date.toString()

    var y = x.split("T")
    var z = new Date(y[0]);
    z.setHours(0);
    z.setHours(0);
    return z.getTime();
  }
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is usual event.' },
    ],
    eleven: [
      { type: 'warning', content: 'This is very long usual event........' },
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 9) {
      return 1394;
    }
    return null;
  }
}
