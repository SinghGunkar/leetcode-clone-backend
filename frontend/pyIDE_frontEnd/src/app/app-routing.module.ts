import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodePanelComponent } from './code-panel/code-panel.component';


const routes: Routes = [
  {path: 'code', component:CodePanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
