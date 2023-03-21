import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logInStatus = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
     this.http.post('/api/login', { username, password }, 
    { withCredentials: true }).subscribe((response)=>{
      this.logInStatus = true;
    },(error)=>{
      this.logInStatus = false;
      console.log(error);
    });
  }
}
