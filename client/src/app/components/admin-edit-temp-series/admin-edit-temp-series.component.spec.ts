import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTempSeriesComponent } from './admin-edit-temp-series.component';

describe('AdminEditTempSeriesComponent', () => {
  let component: AdminEditTempSeriesComponent;
  let fixture: ComponentFixture<AdminEditTempSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditTempSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTempSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
