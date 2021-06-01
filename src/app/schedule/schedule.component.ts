import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  constructor(private eventservice: EventService) { }
  id: number= 1;
  ngOnInit(): void {
      }
  validate(){
    let title = (<HTMLInputElement>document.getElementById("title"))?.value;
    let type = (<HTMLSelectElement>document.getElementById("type"))?.value;
    let date = (<HTMLInputElement>document.getElementById("date"))?.value;
    let start_time = (<HTMLInputElement>document.getElementById("startt"))?.value;
    let location = (<HTMLInputElement>document.getElementById("loc"))?.value;
    let description = (<HTMLInputElement>document.getElementById("desc"))?.value;
    
    if(!title){
      alert("Title must be filled out!");
      return false;
    }
    else if(!type){
      alert("Type must be selected!");
      return false;
    }
    else if(!date){
      alert("Date must be selected!");
      return false;
     }
    else if(!start_time){
      alert("Start Time must be selected!");
      return false;
    }
    else if(!location){
      alert("Location must be filled out!");
      return false;
    }
    else if(!description){
      alert("Description must be filled out!");
       return false;
    }
    else{
      alert("Event Scheduled!");
      return true;
    }
  }
  Create() {
    let title = (<HTMLInputElement>document.getElementById("title"))?.value;
    let type = (<HTMLSelectElement>document.getElementById("type"))?.value;
    let date = (<HTMLInputElement>document.getElementById("date"))?.value;
    let start_time = (<HTMLInputElement>document.getElementById("startt"))?.value;
    let end_time = (<HTMLInputElement>document.getElementById("endt"))?.value;
    let location = (<HTMLInputElement>document.getElementById("loc"))?.value;
    let description = (<HTMLInputElement>document.getElementById("desc"))?.value;
  
    let obj1={
      userid: this.id,
      title: title,
      type: type,
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: location,
      description: description
    }
    if(this.validate() == true){
    console.log(obj1);
    this.eventservice.addEvent(obj1).subscribe(x => obj1);
  }
}
}