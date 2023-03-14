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

import { QuestionComponent } from './question/question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


import { MatDialogModule, } from '@angular/material/dialog';  // authentication view
import { FormsModule } from '@angular/forms'; // authentication view

import { CodePanelComponent } from './code-panel/code-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormLoginComponent } from './authentication/login/form-login/form-login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { FormSignupComponent } from './authentication/signup/form-signup/form-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    CodePanelComponent,
    ToolbarComponent,
    QuestionComponent,
    DashboardComponent,
    ListQuestionsComponent,
    LoginComponent,
    FormLoginComponent,
    SignupComponent,
    FormSignupComponent,
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

    MatTabsModule,
    MatTableModule,
    MatDialogModule,      // for authentication
    FormsModule           // for authentication

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
