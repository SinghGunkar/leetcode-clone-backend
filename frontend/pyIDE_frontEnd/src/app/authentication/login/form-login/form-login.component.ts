/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * form for login page
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Student } from '../../../models/Student'

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  public student!: Student;

  /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormLoginComponent>) {
    dialogRef.disableClose = true; // prevent closing when clicking outside the dialog
  }

  ngOnInit(): void {
      
  }

  public login(email: string, password: string): void {
    this.student = new Student(email, password);
    this.student.print()
  }
}




