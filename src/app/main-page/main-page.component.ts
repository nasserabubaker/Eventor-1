import { AotSummaryResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '@auth0/auth0-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public auth: AuthService,private router:Router    ) {}
  show: boolean = false;
  ngOnInit(): void {
    AOS.init();
     this.auth.isAuthenticated$.subscribe(x => {
       if (x == true) {
         this.router.navigateByUrl("/dashbord");
       }
       else {
         this.show = true;
       }
    })
  }

}
