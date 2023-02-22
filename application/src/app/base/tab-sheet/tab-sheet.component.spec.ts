import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSheetComponent } from './tab-sheet.component';

describe('TabSheetComponent', () => {
  let component: TabSheetComponent;
  let fixture: ComponentFixture<TabSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
