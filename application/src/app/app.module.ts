import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './base/table/table.component';
import { DataTableComponent } from './advanced/data-table/data-table.component';
import { TabSheetComponent } from './base/tab-sheet/tab-sheet.component';
import { TabComponent } from './base/tab/tab.component';
import { LinearRegressionComponent } from './pages/linear-regression/linear-regression.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataTableComponent,
    TabSheetComponent,
    TabComponent,
    LinearRegressionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
