import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlleventsComponent } from './allevents/allevents.component';
import { EditComponent } from './edit/edit.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AuthButtonComponent } from './logout/logout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainComponent } from './main/main.component';
import { CalenderComponent } from './mains/calender/calender.component';
import { DashboardComponent } from './mains/dashboard/dashboard.component';
import { ProfileComponent } from './mains/profile/profile.component';
import { SearchComponent } from './search/search.component';
import { CalenderComponentComponent } from './calender-component/calender-component.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "login", component: AuthButtonComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "calendercomp", component: CalenderComponentComponent },


  {

    path: "dashbord", component: DashboardComponent,
    children: [
      {
        path: "", component: ProfileComponent
      },
      {
        path: "showEvents", component: AlleventsComponent
      },
 
      {
        path: "calender", component: CalenderComponent
      },
      {
        path: "search", component: SearchComponent
      },
      {
        path: "scheduleEvent", component: ScheduleComponent
      },
      
      {
        path: "admin", component: AdminComponent
      }
    ]
  
  },
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
