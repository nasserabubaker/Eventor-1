import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit  {
  events: any = [];
  id = 1;

  constructor(private eventserves:EventService) { }
   async ngOnInit(){
     this.eventserves.getHostedEvents(this.id).subscribe(x => this.events = x);
  }
}
