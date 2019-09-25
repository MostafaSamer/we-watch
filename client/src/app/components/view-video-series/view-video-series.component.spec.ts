import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoSeriesComponent } from './view-video-series.component';

describe('ViewVideoSeriesComponent', () => {
  let component: ViewVideoSeriesComponent;
  let fixture: ComponentFixture<ViewVideoSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVideoSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideoSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
