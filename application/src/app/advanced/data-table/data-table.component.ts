import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() headers: Array<any> = [];
  @Input() data: Array<Array<any>> = [];  
  @Input() hiddenColumns: Map<string, boolean> = new Map<string, boolean>();
  @Input() filename: string = ""; 
  @Input() fileListener: Function | null = null; 
  @Input() hideColumnListener: Function | null = null; 
  @Input() clearListener: Function | null = null;
  maxPage: number = 0;
  itemsPerPage: number = 10;
  pageId: number = 0; 
  shrinkedData: Array<Array<any>> = [];   
  settingsOpen: boolean = false; 

  constructor(){
    this.headers = ["Feature1", "Feature2", "Feature3", "Feature4", "Feature5", "Feature6"];
    this.data = [[34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10],
                  [34.5, 24.3, 65.4, 23, 34.5, 24.3],
                  [1049, 3924, 3214.4, 2045, 3924, 3214.4],
                  [1.3, 4.4, 3.7, 2.6, 3.7, 2.6],
                  [-1, -3, -2.5, -10, -2.5, -10]];
    
    this.hiddenColumns.set("Feature1", false);
    this.hiddenColumns.set("Feature2", false);
    this.hiddenColumns.set("Feature3", false);
    this.hiddenColumns.set("Feature4", false);
    this.hiddenColumns.set("Feature5", false);
    this.hiddenColumns.set("Feature6", true);
  }

  ngOnInit(): void {
    this.maxPage = Math.round(this.data.length / this.itemsPerPage);
    this.updateShrinkedData(); 
  }

  updateShrinkedData(){
    this.shrinkedData = [];
    let empty_array: Array<any> = [];
    for(let i = 0; i < this.headers.length; i++){
      empty_array.push(' '); 
    }
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
        console.log(files[0]); 
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