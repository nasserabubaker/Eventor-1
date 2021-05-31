import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `


    <ng-container >
       <br><br><br>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-container>
  `,
  styles: [],
})
export class AuthButtonComponent implements OnInit {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }
  ngOnInit(): void {
    console.log(this.auth.isAuthenticated$)
  }
  
}

