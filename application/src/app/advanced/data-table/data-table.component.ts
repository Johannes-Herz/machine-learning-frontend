import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() headers: Array<any> = [];
  @Input() data: Array<Array<any>> = [];  
  @Input() hiddenColumns: Map<any, boolean> = new Map<any, boolean>();
  @Input() filename: string = ""; 
  @Input() fileListener: Function | null = null; 
  @Input() hideColumnListener: Function | null = null; 
  @Input() clearListener: Function | null = null;
  maxPage: number = 0;
  itemsPerPage: number = 10;
  pageId: number = 0; 
  shrinkedData: Array<Array<any>> = [];   
  settingsOpen: boolean = false; 

  constructor(){}

  updateShrinkedData(){
    this.shrinkedData = [];
    for(let i = this.pageId * this.itemsPerPage; i < this.pageId * this.itemsPerPage + this.itemsPerPage; i++){
      if(!this.data[i]) {
        return;
      }
      else{
        this.shrinkedData.push(this.data[i]);
      }
    }
  }

  goToFirstPage(){
    this.pageId = 0;
    this.updateShrinkedData(); 
  }
  goOnePageBack(){
    this.pageId -= 1;
    if(this.pageId < 0){
      this.pageId = 0;
    }
    this.updateShrinkedData(); 
  }
  goOnePageFurther(){
    this.pageId += 1;
    if(this.pageId > this.maxPage){
      this.pageId = this.maxPage;
    }
    this.updateShrinkedData(); 
  }
  goToLastPage(){
    this.pageId = this.maxPage;
    this.updateShrinkedData(); 
  }

  onFileChange(event: Event){
    if(this.fileListener){
      const element = event.target as HTMLInputElement;
      const files = element.files; 
      if(files){
        this.fileListener(files[0]); 
      }
    }
  }
  onClear(){
    if(this.clearListener){
      this.clearListener(); 
    }
  }
  onSettingsClicked(){
    this.settingsOpen = !this.settingsOpen; 
  }
  onHideColumn(column: string){
    if(this.hideColumnListener){
      this.hideColumnListener(column); 
    }
  }

}