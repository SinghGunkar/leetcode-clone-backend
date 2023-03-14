import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { QuestionComponent } from './question/question.component';


const routes: Routes = [
  {path: 'code', component:CodePanelComponent},
  {path: 'question/:id', component:QuestionComponent},
  {path: 'dashboard', component:DashboardComponent}
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
