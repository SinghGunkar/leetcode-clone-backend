/**
 * form-login.component.ts
 * Alvin Tsang
 * 
 * form for login page
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { InputEmailComponent } from '../../input-email/input-email.component';
import { InputPasswordComponent } from '../../input-password/input-password.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
    /**
   * @param dialogRef       dialog reference from the parent component
   */
  constructor(public dialogRef: MatDialogRef<FormLoginComponent>) {}

  ngOnInit(): void {
      
  }
}




