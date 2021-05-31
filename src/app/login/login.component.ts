import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  islogin: any;
  constructor(  private route:Router) { }
  ngOnInit(): void {
  }
  logIn() {
    let name = this.username.value;
    let pass = this.password.value;
    alert(name)
    alert(pass)
  }




  

}
