import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService,private router:Router) { }


  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(
      x =>
      {
        if (x == false)
        {
          this.router.navigateByUrl("")
        }
      }
    )
    
  }
  itemClick(event: any) {

    console.log(event.path);
    var id = "";
    for (var i = 0; i < event.path.length; i++) {
      if (event.path[i].id) {
        id = event.path[i].id;
        break;
      }
    }

    for (var i = 0; i <= 6; i++){
      var idd = "item" + i;
      document.getElementById(idd)?.style.setProperty("background-color", "white");
    }

    document.getElementById(id)?.style.setProperty("background-color", "rgb(236, 181, 181)");


  }
}
