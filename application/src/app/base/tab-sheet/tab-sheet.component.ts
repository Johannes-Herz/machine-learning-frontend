import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-sheet',
  templateUrl: './tab-sheet.component.html',
  styleUrls: ['./tab-sheet.component.css']
})
export class TabSheetComponent {

  selectedIndex: number = 0; 
  tabComponents: Array<TabComponent> = []; 

  @Input() tabTitles: Array<String> = []; 
  @ContentChildren(TabComponent) tabComponentsQueryList: QueryList<TabComponent> = new QueryList<TabComponent>();

  ngAfterContentInit() {
    this.tabComponents = this.tabComponentsQueryList.toArray(); 
    this.initTabTitles();
    this.updateActiveTab(this.selectedIndex); 
  }

  constructor(){}

  initTabTitles(){
    let titles: Array<String> = [];
    this.tabComponents.forEach(tab => {
      titles.push(tab.title);
    })
    this.tabTitles = titles; 
  }

  updateActiveTab(index: number){
    this.selectedIndex = index; 
    this.tabComponents.forEach(tab => {
      tab.setActive(false); 
    })
    this.tabComponents[this.selectedIndex].setActive(true); 
  }

}
