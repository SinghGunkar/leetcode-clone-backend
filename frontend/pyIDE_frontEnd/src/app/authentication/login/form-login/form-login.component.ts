/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * Logic for the login page
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  // private student!: Student;
  public errorMsg!: string;


  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormLoginComponent>, 
            private server_api_at: AuthService, 
            private router: Router) {
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

    
    // login is valid, check the database
    this.server_api_at.login(email, password).subscribe(data => {
      // invalid login
      if (!data.isLogin) {
        this.errorMsg = data.message;
      } else {  // login success, redirect to dashboard
        console.log("Redirect to dashboard")
        this.router.navigate(['/dashboard']);
        this.dialogRef.close(); 

      }
    });
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
   * Rediect the page to the sign up page
   */
  public toSignUp(): void {
    console.log("Redirecting to sign up page...");
    this.dialogRef.close()
  }

} // end of FormLoginComponent




