import { Component, Input, SimpleChanges } from '@angular/core';

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
  itemsPerPage: number = 30;
  pageId: number = 0; 
  shrinkedData: Array<Array<any>> = [];   
  settingsOpen: boolean = false; 

  ngOnChanges(changes: SimpleChanges) {
    this.update(); 
  }

  constructor(){
    this.update(); 
  }

  update(){
    this.maxPage = Math.ceil(this.data.length / this.itemsPerPage) - 1; 
    if(this.maxPage < 0){
      this.maxPage = 0; 
    }
    if(this.pageId > this.maxPage){
      this.pageId = 0; 
    }
    this.updateData(); 
  }  
  updateData(){ 
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
    this.updateData(); 
  }
  goOnePageBack(){
    this.pageId -= 1;
    if(this.pageId < 0){
      this.pageId = 0;
    }
    this.updateData(); 
  }
  goOnePageFurther(){
    this.pageId += 1;
    if(this.pageId > this.maxPage){
      this.pageId = this.maxPage;
    }
    this.updateData(); 
  }
  goToLastPage(){
    this.pageId = this.maxPage;
    this.updateData(); 
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