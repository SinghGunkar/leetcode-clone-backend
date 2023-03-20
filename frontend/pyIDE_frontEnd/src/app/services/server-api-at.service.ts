/**
 * server-api-at.service.ts
 * 
 * Alvin Tsang
 * 
 * Service to communicate with the local backend
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment'; // import environment variables

import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerApiATService {

  
  private server_api: string = environment.server_api_AT;
  constructor(private http: HttpClient) { }

  /**
   * Sign the new user up with the database
   * @param user        email of the user
   * @param password    password for the user
   * @returns           a string stating if the request was successful or if it failed
   */
  public signup(user: string, password: string): Observable<any> {
    let url: string = this.server_api + 'signup';
    let data: any = {"user": user, 
                      "password": password
                    };
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
      let data: any = {"user": user, 
                        "password": password
                      };
      return this.http.post<any>(url, data);
    }

} // end of server-api-at.service.ts'
