import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AlleventsComponent } from './allevents/allevents.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event.service';

import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './logout/logout.component';
import { DashboardComponent } from './mains/dashboard/dashboard.component';
import { LeftbarComponent } from './mains/leftbar/leftbar.component';
import { ProfileComponent } from './mains/profile/profile.component';
import { CalenderComponent } from './mains/calender/calender.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CardComponent } from './card/card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { SearchCardComponent } from './search-card/search-card.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AlleventsComponent,

    NavbarComponent,
    MainPageComponent,
    AuthButtonComponent,
    DashboardComponent,
    LeftbarComponent,
    ProfileComponent,
    CalenderComponent,
    CardComponent,
    SearchComponent,
    EditComponent,
    SearchCardComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzAvatarModule,

    AuthModule.forRoot({
      domain: 'dev-3kr-4o27.us.auth0.com',
      clientId: 'DJpwYbSxpYXyPsJ8TZimQFuwKRwniLym'
    }),

    FormsModule,

    BrowserAnimationsModule,
  ],
  providers: [EventService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
