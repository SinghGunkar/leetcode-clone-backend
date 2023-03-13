import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePanelComponent } from './code-panel/code-panel.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {path: 'code', component:CodePanelComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
