import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinearRegressionComponent } from './pages/linear-regression/linear-regression.component';

const routes: Routes = [
  {path: 'test', component: LinearRegressionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
