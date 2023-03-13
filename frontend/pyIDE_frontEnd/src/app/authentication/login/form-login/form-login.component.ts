/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * form for login page
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Student } from '../../../models/Student'

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  private student!: Student;
  public errorMsg!: string;


  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormLoginComponent>) {
    dialogRef.disableClose = true; // prevent closing when clicking outside the dialog
    this.errorMsg = "";
  }

  ngOnInit(): void {
      
  }

  /**
   * 
   * @param email     existing student's email
   * @param password  existing student's password 
   * @returns n/a
   */
  public login(email: string, password: string): void {
    // input fields can not be empty
    if (email.length == 0 || password.length == 0) {
      this.errorMsg = "Invalid email or password"; 
      return;     
    }
    // email must be of sfu domain    
    if (!this.validDomain(email)) {
      this.errorMsg = "Email must be of SFU domain";
      return;
    }

    // login is valid
    this.student = new Student(email, password);
    
    // check that the student exists in the database
    let isValidStudent = true; // for connecting to the db
    
    if (!isValidStudent) {      // not a valid student
      this.errorMsg = "No student found, try creating an account first before logging in";
    } else {  // valid student
      // redirect to dashboard
      console.log("Redirecting to dashboard...")
    }

  }

  /**
   * 
   * @param email string of the student's email
   * 
   * Check that the email is of sfu domain
   */
  private validDomain(email: string): boolean {
    const sfuDomain: string = "@sfu.ca";
    let emailDomain = email.substring(email.length - sfuDomain.length, email.length);
    return sfuDomain === emailDomain;
  }

  public toSignUp(): void {
    console.log("Redirecting to sign up page...");
  }


} // end of FormLoginComponent




