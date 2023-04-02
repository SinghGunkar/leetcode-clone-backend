


import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { CallbackOneParam } from "./../interfaces";
import { HttpClient } from '@angular/common/http';
import { environment } from './../environment';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { QuestionServiceService } from './../question-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  email:string;
  role:string;
  name:string;
  id:string;
  isAdmin:boolean;

  constructor(private http: HttpClient, private fb: FormBuilder, private auth:AuthService, private questionService: QuestionServiceService,private router: Router){
    this.email = this.auth.getEmail();
    this.role = this.auth.getUserType();
    this.name = this.auth.getUserName();
    this.id = this.auth.getUID();

    if(this.role == "admin"){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }





  

}
