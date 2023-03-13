import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule, } from '@angular/material/dialog';  // authentication view
import { FormsModule } from '@angular/forms'; // authentication view

import { CodePanelComponent } from './code-panel/code-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormLoginComponent } from './authentication/login/form-login/form-login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SignupFormComponent } from './authentication/signup/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CodePanelComponent,
    ToolbarComponent,
    LoginComponent,
    FormLoginComponent,
    SignupComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,      // for authentication
    FormsModule           // for authentication
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
