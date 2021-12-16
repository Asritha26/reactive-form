import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormdataService } from '../services/formdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private formSrv: FormdataService, private fb: FormBuilder, private route:Router) { }
  registerForm: FormGroup;
  
  ngOnInit(): void {
    this.InitForms();
    this.InitSubscriptions();    
  }
  UserRegister(){
    let result;
    if (this.registerForm.valid) {
     result=this.formSrv.AddUser(this.registerForm.value);
     this.formSrv.display();
    }
   if(result==true){
      this.route.navigate(['/login']);// route
    }
    
  }
  ClearData(){
    this.registerForm.reset();
  }

  InitForms() {
    this.registerForm = this.fb.group({
      FirstName: new FormControl('',Validators.required),
      LastName: new FormControl(''),
      Email: new FormControl('',[Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      ConfirmPassword: new FormControl(''),
      Phone: new FormControl(''),
      Address: new FormControl(''),
      Pincode: new FormControl('')
    });
    
  }

  InitSubscriptions() {
 // this.registerForm.valueChanges.subscribe(v => {
      //console.log(this.registerForm.valid, v, this.registerForm?.controls?.Email
        //,this.registerForm?.controls?.ConfirmPassword);
   // });
    this.registerForm?.controls?.Email?.valueChanges.subscribe(v => {
      if (this.formSrv.IsUserPresent(v)) {
       console.log('Email Already Exist !!!', v);
        this.registerForm?.controls?.Email?.setErrors({userPresent: true});
      } else {
        //console.log('email error cleard', v);
        this.registerForm?.controls?.Email?.setErrors(null);
      }
    });
    this.registerForm?.controls?.ConfirmPassword?.valueChanges.subscribe(v => {
      if (this.registerForm?.controls?.Password?.value === v) {
        //console.log('pw error cleared', v);
        this.registerForm?.controls?.ConfirmPassword?.setErrors(null);
      } else {        
        //console.log('pw error !!!!', v);
        this.registerForm?.controls?.ConfirmPassword?.setErrors({notsame: true});
      }
    })
  }
RouteToDashboard(){
  this.route.navigate(['/dashboard']);
}
}
