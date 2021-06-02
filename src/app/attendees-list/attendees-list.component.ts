import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.css']
})
export class AttendeesListComponent implements OnInit {

  constructor(private eventservice: EventService,private route:ActivatedRoute) { }
  eventID: number = -1;
  attendes: any = [];
  all_users : any = [];
  ngOnInit(): void {
    this.eventID = this.route.snapshot.params['id'];
    this.eventservice.GetAttendees(this.eventID).subscribe(x => this.attendes = x);
    this.eventservice.GetUsers().subscribe(x => this.all_users = x);
  }

  getName(id: number) {
    if (this.all_users == undefined) return;
    for (let i = 0; i < this.all_users.length; i++){
      if (this.all_users[i].ID === id) {
        return this.all_users[i].name;
      }
    }
    return "not found Error";
  }
  getEmail(id: number) {
    if (this.all_users == undefined) return;
    for (let i = 0; i < this.all_users.length; i++){
      if (this.all_users[i].ID === id) {
        return this.all_users[i].email;
      }
    }
    return "not found Error";
  }
  Ondelete(uid: number) {
    this.eventservice.DeleteAttendee(this.eventID, uid).subscribe(x=>window.location.reload());
    
  }
}
