import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormLoginComponent } from './form-login/form-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    let d = this.dialog.open(FormLoginComponent, {
      width: "50%",
      position: {top: "15%", left: "25%"}
    });

  }
}
