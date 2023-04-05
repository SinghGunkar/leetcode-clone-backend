import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

/**
 * The toolbar component is used to display a toolbar.
 */ 
export class ToolbarComponent {

  constructor(private auth:AuthService){}


  logout(){
    this.auth.logout();
  }
}
