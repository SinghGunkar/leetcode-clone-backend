import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';

const routes: Routes = [

  {path: 'code', component:CodePanelComponent},         // this is a route for the code panel playground
  {path: 'question/:id', component:QuestionComponent},  // this is a route for the question page, id is the question id
  {path: 'dashboard', component:DashboardComponent},    // this is a route for the dashboard
  {path: '', component:LoginComponent},                 // root path --> login page
  {path: 'signup', component:SignupComponent},          // path to signup page  
  {path: 'questionEditor',component:QuestionEditorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
