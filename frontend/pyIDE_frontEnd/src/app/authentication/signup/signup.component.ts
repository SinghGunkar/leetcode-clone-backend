/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * Sign up page with a dialog to sign up with
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormSignupComponent } from './form-signup/form-signup.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    let d = this.dialog.open(FormSignupComponent, {
      width: "50%",
      position: {top: "15%", left: "25%"},
    });

  }
} // end of class SignupComponent
