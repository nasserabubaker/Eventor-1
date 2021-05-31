import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id: number = 2;
  word: string = "";
  result: any = [];
  searched: boolean = false;
  constructor(private eventservice : EventService) { }

  ngOnInit(): void {
  }
  async Search() {
    this.word = (<HTMLInputElement>document.getElementById("search"))?.value;
    if (this.word == "") {
      alert("empty input");
      return;
    }
    this.eventservice.eventSearch({ word: this.word }).subscribe(x => { this.result = x; console.log(x); this.searched = true;});

    
  }

}
