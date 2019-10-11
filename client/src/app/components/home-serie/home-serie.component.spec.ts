import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSerieComponent } from './home-serie.component';

describe('HomeSerieComponent', () => {
  let component: HomeSerieComponent;
  let fixture: ComponentFixture<HomeSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
