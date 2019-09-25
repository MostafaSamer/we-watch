import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoMoviesComponent } from './view-video-movies.component';

describe('ViewVideoMoviesComponent', () => {
  let component: ViewVideoMoviesComponent;
  let fixture: ComponentFixture<ViewVideoMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVideoMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideoMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
