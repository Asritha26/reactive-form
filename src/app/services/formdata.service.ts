import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {

  Users: any[] = [];
  UserLog: any[]=[];
  UserLoggedIn;
 
  constructor() { 
    if (sessionStorage.getItem('Users')) {
      this.Users = JSON.parse(sessionStorage.getItem('Users'));
    }
    if (sessionStorage.getItem('UserLoggedIn')) {
      this.UserLoggedIn = JSON.parse(sessionStorage.getItem('UserLoggedIn'));
    }
  }

  AddUser(data) {
      this.Users.push(data);
      this.AddToDB();
      return true
  }
  IsUserPresent(email) {
    return this.Users.find(u => u.Email===email)
  }
  GetUser(email){
     return this.Users.find(u => u.Email===email)
  }
  UpdateLoggedInUser(user) {
    this.UserLoggedIn = user;
    sessionStorage.setItem('UserLoggedIn', JSON.stringify(this.UserLoggedIn));
  }

  AddToDB() {
    sessionStorage.setItem('Users', JSON.stringify(this.Users));
  }
   
  display(){
    console.log(this.Users);
    
  }
  displayLog(){
    console.log(this.UserLog);
    
  }
  AddUserLogin(data) {
    this.Users.push(data);
  }
  UserLogin(data){
    this.UserLog.push(data);
  }
 
 
}
