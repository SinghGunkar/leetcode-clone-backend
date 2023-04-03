import { Injectable } from '@angular/core';
import { CallbackOneParam } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private ENDPOINT = environment.backendEndpoint;
  public userList: any = []

  constructor(private http: HttpClient, private auth:AuthService, private router: Router) {}

  getUserList(callback: CallbackOneParam<any>) {
    this.auth.adminOnly();
    this.freshUserList(() => {
      callback(this.userList);
    });
  } // end of getUserList()

  private freshUserList(callback: CallbackOneParam<any>) {
    const headers = this.auth.authTokenHeader();
    this.http.get(this.ENDPOINT + 'user/getAllUsers', {headers}).subscribe((data: any) => {
      let users: any = [];

      for (let i = 0; i < data.users.length; i++) {
        users.push({ "UserId": `${(data.users[i]._id).toString()}`, 
                      "username": `${(data.users[i].name).toString()}`, 
                      "email": `${(data.users[i].email).toString()}`, })
      }
      this.userList = users;
      this.userList.sort((u1: any, u2: any) => u1.username.localeCompare(u2.username));
      callback(this.userList);
    });
  } // end of freshUsersList()



  // deleteUser(uid: string, callback: CallbackOneParam<any>) {
  //   this.auth.adminOnly();
  //   const headers = this.auth.authTokenHeader();

  //   this.http.delete<any>(this.ENDPOINT + "user/delete/" + uid.toString(), { headers })
  //   .subscribe((response)=>{
  //     callback([true, null]);
  //   },(error)=>{
  //     callback([false, error]);
  //   })
  // }


}
