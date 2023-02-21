import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() thead: Array<string> = []; 
  @Input() tbody: Array<Array<any>> = []; 
  @Input() hiddenColumns: Map<any, boolean> = new Map<any, boolean>; 
  @Input() clickListener: Function | null = null; 

  constructor() {
    this.thead = ["Feature1", "Feature2", "Feature3", "Feature4"];
    this.tbody = [[34.5, 24.3, 65.4, 23],
                  [1049, 3924, 3214.4, 2045],
                  [1.3, 4.4, 3.7, 2.6],
                  [-1, -3, -2.5, -10]];
    this.hiddenColumns.set("Feature1", false);
    this.hiddenColumns.set("Feature2", false);
    this.hiddenColumns.set("Feature3", false);
    this.hiddenColumns.set("Feature4", false);
  }

  onClick(){
    if(this.clickListener){
      this.clickListener(); 
    }
  }
}
