import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventservice: EventService,private router:Router) { }
  
  id: number = -1;
  data: any = undefined;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.eventservice.getEventsDetails(this.id).subscribe((x: any) => { this.data = x; console.log(this.data)})
  }
  display() {
    let title = (<HTMLInputElement>document.getElementById("title"))?.value;
    let type = (<HTMLSelectElement>document.getElementById("type"))?.value;
    let date = (<HTMLInputElement>document.getElementById("date"))?.value;
    let start_time = (<HTMLInputElement>document.getElementById("startTime"))?.value;
    let end_time = (<HTMLInputElement>document.getElementById("endtTime"))?.value;
    let location = (<HTMLInputElement>document.getElementById("location"))?.value;
    let description = (<HTMLInputElement>document.getElementById("Description"))?.value;

    let obj = {
      ID : this.id ,
      title: title,
      type:type,
      date:date,
      start_time:start_time,
      end_time:end_time,
      location:location,
      description:description
    }
    console.log(obj);
    this.eventservice.EditEvent(obj).subscribe(x => {
      this.router.navigateByUrl("dashbord/showEvents");
    })
  }
}
