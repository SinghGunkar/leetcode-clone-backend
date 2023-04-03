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
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.css']
})
export class FormSignupComponent {
  public errorMsg!: string; // display errors to the user
  public isAuth: boolean;
  private currentPath: string;
  


  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormSignupComponent>, 
            private server_api_at: AuthService,
            private router: Router) {
    this.errorMsg = "";
    this.currentPath = this.router.url;
    if (this.currentPath.localeCompare("/signup") === 0) {
      dialogRef.disableClose = true; // prevent closing when clicking outside the dialog
      this.isAuth = true;
    } else {
      dialogRef.disableClose = false; // prevent closing when clicking outside the dialog
      this.isAuth = false;
    }

  }

  ngOnInit(): void {}

  /**
   * Perform data validation and submit. If all inputs are valid, redirect to the dashboard
   * @param username     existing student's user name
   * @param email     existing student's email
   * @param password  existing student's password 
   * @returns n/a     redirect the user to the login in page if successful, display
   *                  an error message otherwise
   */
  public signup(username: string, email: string, password: string, confirmPassword: string): void {
    // input fields can not be empty
    if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
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
    this.server_api_at.signup(username, email, password).subscribe(data => {
        if (this.currentPath.localeCompare("/signup") === 0) {
          this.router.navigate(['']);
          this.dialogRef.close();
        } else if (this.currentPath.localeCompare("/viewUsers") === 0) {
          this.router.navigate(['/viewUsers']);
          this.dialogRef.close();
        }
    },error =>{
      // catch error from backend and put in this.errorMsg
      // alert(error.error.error)
      this.errorMsg = error.error.error;
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

  public cancel(): void {
    this.dialogRef.close();
  }
} // end of class FormSignupComponent
