import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  getHostedEvents(id:number) {
    return this.http.get("http://localhost:3000/API/events/Show_all/" +id);
  }
  EditEvent(obj:any){
    return this.http.put("http://localhost:3000/API/events/editevent",obj)
  }
  getEventsDetails(id: number) {
    return this.http.get("http://localhost:3000/API/events/get_event/" + id);
  }
  addEvent(obj:any){
    return this.http.post("http://localhost:3000/API/events/addevent", obj)
  }
  DeleteEvent(obj:any){
    return this.http.delete("http://localhost:3000/API/events/deleteevent/"+ obj.id)
  }
  eventSearch(obj: any) {
    return this.http.get("http://localhost:3000/API/events/search/"+ obj.word)
  }
  getAttendedEvents(id:number) {
    return this.http.get("http://localhost:3000/API/events/attended_events/" +id);
  }
  getAllUsers() {
    return this.http.get("http://localhost:3000/API/Users");
  }
  LeaveEvent(obj:any){
    return this.http.delete("http://localhost:3000/API/events/leave_event/"+ obj.uid + "/" + obj.eid);
  }
  DeleteUser(id:string){
    return this.http.delete("http://localhost:3000/API/Users/"+id);
  }
  joinEvent(obj:any){
    return this.http.get("http://localhost:3000/API/events/search/join/"+obj.userid+ "/" + obj.eid);
  } 
  GetAttendees(EID:number){
    return this.http.get("http://localhost:3000/API/events/attendees/"+ EID);
  } 
  GetUsers(){
    return this.http.get("http://localhost:3000//API/events/users");
  }
  DeleteAttendee(EID: number , UID: number){
    return this.http.delete("http://localhost:3000/API/events/deleteattendee/"+EID + "/" + UID);
  }
}