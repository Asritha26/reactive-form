import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormdataService } from '../services/formdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formSrv: FormdataService, private fb: FormBuilder,private route:Router) { }
  LoginForm: FormGroup;
  //ShowRegister;
  get UserLoggedIn() {
    return this.formSrv.UserLoggedIn;
  }

  ngOnInit(): void {
    this.InitLogin();
  }
  InitLogin() {
    this.LoginForm = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', Validators.required)
    });

  }
  UserLogin() {
    if (this.LoginForm.valid) {
      if (this.UserLoggedIn) {
        alert("Already User is logged in " + this.UserLoggedIn?.Email)
        return;
      }

      else if (this.formSrv.IsUserPresent(this.LoginForm.controls.Email.value)) {
        if(this.formSrv.CheckPassword(this.LoginForm.controls.Email.value, this.LoginForm.controls.Password.value)){
          this.formSrv.UpdateLoggedInUser(this.formSrv.GetUser(this.LoginForm.controls.Email.value));
          console.log("Logged In");
          this.formSrv.UserLogin(this.LoginForm.value);
          this.formSrv.displayLog();
          this.route.navigate(['/dashboard']);
          //this.ShowRegister=false;
        }
        else{
          console.log("Password Incorrect");
        }  
        
      }
      else {
        console.log("Not present. Please register");
        //this.ShowRegister=true;
      }
    }
  }



  
  Logout() {
    if (this.UserLoggedIn) {
      console.log("User Logged Out")
      this.LoginForm.reset();
      this.formSrv.UpdateLoggedInUser(null);
    }

  }



}
