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

  constructor() {}

  onClick(){
    if(this.clickListener){
      this.clickListener(); 
    }
  }
}
