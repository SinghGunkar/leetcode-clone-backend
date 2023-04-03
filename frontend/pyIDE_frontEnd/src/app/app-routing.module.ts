import { QuestionSetManagementComponent } from './question-set-management/question-set-management.component';
import { CreateNewCourseComponent } from './create-new-course/create-new-course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { NewQuestionComponent } from './new-question/new-question.component';

const routes: Routes = [

  {path: 'code', component:CodePanelComponent},         // this is a route for the code panel playground
  {path: 'question/:id', component:QuestionComponent},  // this is a route for the question page, id is the question id
  {path: 'dashboard', component:DashboardComponent},    // this is a route for the dashboard
  {path: '', component:LoginComponent},                 // root path --> login page
  {path: 'signup', component:SignupComponent},          // path to signup page  
  {path: 'newQuestion', component:NewQuestionComponent}, // path to new question component
  {path: 'newCourse', component:CreateNewCourseComponent},
  {path: 'course/questionSetManagement/:courseID', component:QuestionSetManagementComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
