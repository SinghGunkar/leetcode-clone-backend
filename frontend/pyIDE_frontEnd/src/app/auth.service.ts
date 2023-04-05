import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment'; // import environment variables
import { Observable } from 'rxjs';
import { CallbackOneParam } from './interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public logInStatus: boolean = false;
  private server_api: string = environment.backendEndpoint;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Sign the new user up with the database
   * @param user        email of the user
   * @param password    password for the user
   * @returns           a string stating if the request was successful or if it failed
   */
  public signup(username: string, email: string, password: string): Observable<any> {
    let url: string = this.server_api + 'user/signup';
    let data: any = { "name": username, "email": email, "password": password };
    return this.http.post<any>(url, data);
  }

  /**
   * Check that the user exists in the db
   * @param user        email of the user
   * @param password    password for the user
   * @returns           a string stating if the request was successful or if it failed
   */
  public login(user: string, password: string, callback: CallbackOneParam<any>) {
    let url: string = this.server_api + "user/login";
    let data: any = { "email": user, "password": password };
    this.http.post<any>(url, data).subscribe((response) => {
      console.log(response);
      let result = response;
      if (result && result.token) {

        console.log(result.token)
        sessionStorage.setItem('token', result.token);
        const headers = this.authTokenHeader();
        // localStorage.setItem('token', result.token);
        this.http.get<any>(this.server_api + "user/getLoggedInUser", { headers }).subscribe((user_data) => {
          console.log(user_data);
          sessionStorage.setItem('role', user_data.data.role);
          sessionStorage.setItem('_id', user_data.data._id);
          sessionStorage.setItem('name', user_data.data.name);
          sessionStorage.setItem('email', user_data.data.email);
          callback(true);
          return;
        })
      }
      callback(false)
      return;
    }, (err) => {
      callback(false)
      return;
    })
  }


  public logout(){
    localStorage.clear();
    sessionStorage.clear();
    let url: string = this.server_api + "user/logout";
    this.http.post<any>(url,{}).subscribe((response) => {
      // console.log(response);
      this.router.navigate(['/']);
    },(error)=>{
      console.log(error);
      this.router.navigate(['/']);
    })

  }

  authTokenHeader(): HttpHeaders {
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token?.toString() })
    if (!token) {
      this.router.navigate(['/']);
      return new HttpHeaders();
    }
    return headers;
  }

  getAuthToken() {
    let token = sessionStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/']);
      return null;
    }
    return token;
  }

  getUID(){

    let uid = sessionStorage.getItem('_id');
    if (!uid){
      this.router.navigate(['/']);
      return '';
    }
    return uid;
  }
  
  getUserType(){
    let role = sessionStorage.getItem('role');
    if (!role){
      this.router.navigate(['/']);
      return '';
    }
    return role;
  }

  getEmail(){
    let email = sessionStorage.getItem('email');
    if (!email){
      this.router.navigate(['/']);
      return '';
    }
    return email;
  }

  getUserName(){
    let email = sessionStorage.getItem('email');
    if (!email){
      this.router.navigate(['/']);
      return '';
    }
    return email;
  }

  adminOnly(){
    let role = sessionStorage.getItem('role');
    if (role == 'admin'){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
} // end of auth.service.ts
