import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  id = 1;
  title = null;
  date = null;
  start_time = null;
  end_time = null;
  location = null;
  description = null;
  type = null;

  constructor(private scheduleservice:EventService) { }
  ngOnInit(): void {
    let newevent={
      title: this.title,
      type: this.type,
      date: this.date,
      start_time: this.start_time,
      end_time: this.end_time,
      location: this.location,
      description: this.description,  
      userid: this.id
    }
    this.scheduleservice.addEvent(newevent).subscribe(x => this.id = newevent.userid);
  }
}