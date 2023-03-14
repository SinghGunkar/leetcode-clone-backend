/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * Logic for the sign up page
 * 
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Student } from '../../../models/Student'
@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent {
  private student!: Student;
  public errorMsg!: string; // display errors to the user


  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormSignupComponent>) {
    dialogRef.disableClose = true; // prevent closing when clicking outside the dialog
    this.errorMsg = "";
  }

  ngOnInit(): void {}

  /**
   * Perform data validation and submit. If all inputs are valid, redirect to the dashboard
   * @param email     existing student's email
   * @param password  existing student's password 
   * @returns n/a
   */
  public signup(email: string, password: string, confirmPassword: string): void {
    // input fields can not be empty
    if (email.length == 0 || password.length == 0 || confirmPassword.length == 0) {
      this.errorMsg = "Invalid email or password"; 
      return;     
    }
    // email must be of sfu domain    
    if (!this.validDomain(email)) {
      this.errorMsg = "Email must be of SFU domain";
      return;
    }

    // password and confirmPassword must match
    if (password !== confirmPassword) {
      this.errorMsg = "Passwords do not match!";
      return;
    }

    // login is valid
    this.student = new Student(email, password);
    
    // check that the student exists in the database
    let isValidStudent: boolean = true; // for connecting to the db
    
    if (!isValidStudent) {      // not a valid student
      this.errorMsg = "No student found, try creating an account first before logging in";
    } else {  // valid student
      // redirect to dashboard
      console.log("Redirecting to dashboard...")
    }
  }

  /**
   * Check that the email is of sfu domain
   * @param email string of the student's email
   */
  private validDomain(email: string): boolean {
    const sfuDomain: string = "@sfu.ca";
    let emailDomain: string = email.substring(email.length - sfuDomain.length, email.length);
    return sfuDomain === emailDomain;
  }

  /**
   * Redirect the user to the login page
   */
  public toLogin(): void {
    console.log("Redirecting to login page...");
  }
} // end of class FormSignupComponent
