import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [

  {path: 'code', component:CodePanelComponent},
  {path: 'question/:id', component:QuestionComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '', component:LoginComponent},   // root path --> login page
  {path: 'signup', component:SignupComponent},   // path to signup page
  {path: 'code', component:CodePanelComponent},
  

];

// {
//   path: 'view/:id',
//   component:ViewNotesComponent,
// }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
