import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMovieComponent } from './temp-movie.component';

describe('TempMovieComponent', () => {
  let component: TempMovieComponent;
  let fixture: ComponentFixture<TempMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
