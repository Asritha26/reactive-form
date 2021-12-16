import { Component, Input, OnInit } from '@angular/core';
import { FormdataService } from '../services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(private formSrv: FormdataService,private route:Router) { }

  get UserLoggedIn() {
    return this.formSrv.UserLoggedIn;
  }
  Logout() {
    if (this.UserLoggedIn) {
      console.log("User Logged Out")
      this.formSrv.UpdateLoggedInUser(null);
      this.route.navigate(['/dashboard'])
    
    }
  
  }
  RouteToLogin(){
    this.route.navigate(['/login']);
  }
  RouteToRegister(){
    this.route.navigate(['/register']);
  }
  ngOnInit(): void {
  }

}
