/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * Logic for the sign up page
 * 
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Student } from '../../../models/Student';
import { ServerApiATService } from 'src/app/services/server-api-at.service';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent {
  public errorMsg!: string; // display errors to the user


  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormSignupComponent>, 
            private server_api_at: ServerApiATService,
            private router: Router) {
    dialogRef.disableClose = true; // prevent closing when clicking outside the dialog
    this.errorMsg = "";
  }

  ngOnInit(): void {}

  /**
   * Perform data validation and submit. If all inputs are valid, redirect to the dashboard
   * @param email     existing student's email
   * @param password  existing student's password 
   * @returns n/a     redirect the user to the login in page if successful, display
   *                  an error message otherwise
   */
  public signup(email: string, password: string, confirmPassword: string): void {
    // input fields can not be empty
    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
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
    this.server_api_at.signup(email, password).subscribe(data => {
      // email already exists
      if (data.localeCompare("Email Address is Already Registered") === 0) {
        this.errorMsg = "Email Address is Already Registered!";
        return;
      }
      // creating a new account
      if (data.localeCompare("Registration Successful") === 0) {
        console.log("Redirecting to login...");
        this.router.navigate(['']);
        this.dialogRef.close();
      }
    })
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
    this.dialogRef.close()
  }
} // end of class FormSignupComponent
