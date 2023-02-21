import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './base/table/table.component';
import { DataTableComponent } from './advanced/data-table/data-table.component';

const routes: Routes = [
  {path: 'test', component: DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
