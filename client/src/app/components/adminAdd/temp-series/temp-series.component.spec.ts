import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSeriesComponent } from './temp-series.component';

describe('TempSeriesComponent', () => {
  let component: TempSeriesComponent;
  let fixture: ComponentFixture<TempSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
