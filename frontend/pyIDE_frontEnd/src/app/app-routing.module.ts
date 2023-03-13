import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {path: '', component:LoginComponent},   // root path to login page
  {path: 'code', component:CodePanelComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
