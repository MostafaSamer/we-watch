import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMovieComponent } from './home-movie.component';

describe('HomeMovieComponent', () => {
  let component: HomeMovieComponent;
  let fixture: ComponentFixture<HomeMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
