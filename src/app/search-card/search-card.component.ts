import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html'
})
export class SearchCardComponent {
  constructor(private eventservice: EventService,private router:Router) { }
  @Input("n") event: any;
  userid = 2;
  events: any = [];
  getDDate(date: Date) {
    var x = date.toString()

    var y = x.split("T")
    return y[0];
  }
  getType(id: number) {
    return id == 1 ? "Public" : "Private";
  }
  joinEvent(){
    let obj={
      userid: this.userid,
      eid: this.event.ID
    }
    this.eventservice.joinEventttt(obj).subscribe(x => this.events = x);
    alert("Event Joined!");
  }
}
