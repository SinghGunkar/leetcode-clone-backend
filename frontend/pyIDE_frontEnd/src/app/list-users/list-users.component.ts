import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

import { MatDialog } from '@angular/material/dialog';
import { FormSignupComponent } from './../authentication/signup/form-signup/form-signup.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  email:string;
  role:string;
  name:string;
  id:string;
  isAdmin:boolean;

  
  userList: any[];


  constructor(private userService: UsersService, private router:Router, 
              private fb: FormBuilder, private auth: AuthService, public dialog: MatDialog) {
    this.userList = [];
    this.email = this.auth.getEmail();
    this.role = this.auth.getUserType();
    this.name = this.auth.getUserName();
    this.id = this.auth.getUID();
    this.isAdmin = this.role === 'admin' ? true : false;
  }

  ngOnInit() {
    this.userService.getUserList((userList) => {
      this.userList = userList;
      console.log(this.userList);
    });
  }

  deleteUser(uid: string): void {
    console.log("delete");
  } // end of deleteUser()

  displayedColumns: string[] = ["name", "email", "id"]


  newUser() {
    let d = this.dialog.open(FormSignupComponent, {
      width: "50%",
      position: {top: "15%", left: "25%"},
    });

  }

}
