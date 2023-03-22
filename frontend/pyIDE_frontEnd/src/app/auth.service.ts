import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment'; // import environment variables
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public logInStatus: boolean = false;
  private server_api: string = environment.backendEndpoint;

  constructor(private http: HttpClient) { }

  /**
   * Sign the new user up with the database
   * @param user        email of the user
   * @param password    password for the user
   * @returns           a string stating if the request was successful or if it failed
   */
  public signup(user: string, password: string): Observable<any> {
    let url: string = this.server_api + 'signup';
    let data: any = {"user": user, "password": password};
    return this.http.post<any>(url, data);
  }

  /**
   * Check that the user exists in the db
   * @param user        email of the user
   * @param password    password for the user
   * @returns           a string stating if the request was successful or if it failed
   */
  public login(user: string, password: string): Observable<any> {
    let url: string = this.server_api + "login";
    let data: any = {"user": user, "password": password};
    return this.http.post<any>(url, data);
  }

} // end of auth.service.ts
