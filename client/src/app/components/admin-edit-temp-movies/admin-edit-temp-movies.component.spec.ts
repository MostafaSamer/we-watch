import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTempMoviesComponent } from './admin-edit-temp-movies.component';

describe('AdminEditTempMoviesComponent', () => {
  let component: AdminEditTempMoviesComponent;
  let fixture: ComponentFixture<AdminEditTempMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditTempMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTempMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
