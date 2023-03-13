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
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';  // authentication view
import { FormsModule } from '@angular/forms'; // authentication view

import { CodePanelComponent } from './code-panel/code-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InputEmailComponent } from './authentication/input-email/input-email.component'; // authentication view
import { InputPasswordComponent } from './authentication/input-password/input-password.component';  // authentication view
import { LoginComponent } from './authentication/login/login.component';
import { FormLoginComponent } from './authentication/login/form-login/form-login.component';  // authentication view

@NgModule({
  declarations: [
    AppComponent,
    CodePanelComponent,
    ToolbarComponent,
    InputEmailComponent,
    InputPasswordComponent,
    LoginComponent,
    FormLoginComponent,

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
