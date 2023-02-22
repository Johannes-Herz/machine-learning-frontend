import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  file: File | null = null; 
  headers: Array<string> = [];
  // needs to be number at some point
  data: Array<Array<any>> = [];
  excludedColumns: Map<string, boolean> = new Map<string, boolean>(); 
  dataChangeListeners: Array<Function> = [];

  constructor() { 
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
    
    this.excludedColumns.set("Feature1", false);
    this.excludedColumns.set("Feature2", false);
    this.excludedColumns.set("Feature3", false);
    this.excludedColumns.set("Feature4", false);
    this.excludedColumns.set("Feature5", false);
    this.excludedColumns.set("Feature6", true);
  }

  getHeaders(){
    return this.headers;
  }
  getData(){
    return this.data;
  }
  getExcludedColumn(){
    return this.excludedColumns; 
  }

  setExcludedColumn(column: string){
    this.excludedColumns.set(column, true);
  }

  addDataChangeListener(listener: Function){
    this.dataChangeListeners.push(listener); 
  }

  executeDataChangeListener(){
    this.dataChangeListeners.forEach(func => {
      func(); 
    })
  }

  async loadFile(file: File){
    this.clear();    

    this.file = file; 
    console.log('File Upload triggered in <RegressionCache>: ', this.file); 

    const chunks = await this.readFile(this.file); 
    let array = chunks.map(row => {
      return row.split(','); 
    })
    let header = array.shift();
    if(header){
      this.headers = header; 
    }
    this.data = array; 
    this.headers.forEach(item => {
      this.excludedColumns.set(item, false); 
    })
    this.executeDataChangeListener(); 
  }

  readFile(file: File): Promise<string[]>{
    let chunkSize = 1024 * 1024; 
    const reader = new FileReader();
    let start = 0; 
    let end = 0;
    let chunkTracker = 0; 
    let partialRow: string; 
    let delimiter: string = ''; 

    return new Promise<string[]>((resolve, reject) => {
      const chunks: Array<string> = [];
    
      reader.onloadend = (event) => {

        const textDecoder = new TextDecoder(); 
        let chunk = textDecoder.decode(reader.result as ArrayBuffer); 

        // check delimiter used in the specific file
        if(!delimiter){
          if(chunk.includes('\r\n')){
            delimiter = '\r\n'; 
          }
          else if(chunk.includes('\n')){
            delimiter = '\n'; 
          }
          else if(chunk.includes('\r')){
            delimiter = '\r'; 
          }
        }

        if(chunk.includes(delimiter)){
          
          if(partialRow){
            chunk = partialRow + chunk; 
          }
          
          let rows: string[] = chunk.split(delimiter); 

          rows.forEach(row => {
            chunks.push(row);
          })

        } else {
          partialRow = chunk; 
        }

        if(chunkTracker < file.size){
          start = chunkTracker; 
          end = chunkTracker + chunkSize; 
          if(end > file.size){
            end = file.size; 
          }
          chunkTracker = end;
          const nextChunk = file.slice(start, end);
          reader.readAsArrayBuffer(nextChunk);  
        } else{
          resolve(chunks); 
        }
      }

      start = 0; 
      end = Math.min(chunkSize, file.size); 
      chunkTracker = end; 
      let firstChunk = file.slice(start, end);
      reader.readAsArrayBuffer(firstChunk); 

    })
  }

  clear(){
    this.file = null; 
    this.headers = [];
    this.data = [];
    this.excludedColumns.clear(); 
    this.executeDataChangeListener();
  }

}
