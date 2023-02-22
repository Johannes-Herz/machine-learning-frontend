import { Component } from '@angular/core';
import { DataManagementService } from 'src/app/services/data-management.service';

@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.css']
})
export class LinearRegressionComponent {

  headers: Array<any> = [];
  data: Array<Array<any>> = [];  
  hiddenColumns: Map<any, boolean> = new Map<any, boolean>();
  filename: string = ""; 

  constructor(private dataManagementService: DataManagementService){
    this.dataManagementService.addDataChangeListener(this.updateData.bind(this));
  }

  updateData(){
    this.headers = this.dataManagementService.getHeaders();
    this.data = this.dataManagementService.getData();
    this.hiddenColumns = this.dataManagementService.getExcludedColumns(); 
    this.filename = this.dataManagementService.getFilename();
  }

  onFileChange(file: File){
    this.dataManagementService.loadFile(file); 
  }

  onHideColumn(column: string){
    this.dataManagementService.setExcludedColumn(column); 
  }

  onClear(){
    this.dataManagementService.clear(); 
  }

}
