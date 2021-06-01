import { Component, Input } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html'
})
export class Card1Component {
  constructor(private eventserves: EventService) { }
  uid = 2;
  @Input("s") event: any;
  getDDate(date: Date) {
    if(!date){
      return "Undefined";
    }
    var x = date.toString()

    var y = x.split("T")
    return y[0];
  }
  Leave(){
    let obj = {
      uid: this.uid,
      eid: this.event.ID
    }
    var now = new Date();
    var nowt = now.getTime();
    var event_date =this.getDDate(this.event.Date);
    console.log(event_date);
    var ev = new Date(event_date);
    var event_time = ev.getTime();

    if (nowt < event_time){
      this.eventserves.LeaveEvent(obj).subscribe(x => {
        alert("Event Left!");
        document.location.reload();
      });
    }
    else{
      alert("Cannot leave events that passed!");
    }
}
}