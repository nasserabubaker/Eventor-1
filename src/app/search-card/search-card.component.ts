import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html'
})
export class SearchCardComponent {
  @Input("n") event: any;
  userid = 2;

  getDDate(date: Date) {
    var x = date.toString()

    var y = x.split("T")
    return y[0];
  }
  getType(id: number) {
    return id == 1 ? "Public" : "Private";
  }
}
