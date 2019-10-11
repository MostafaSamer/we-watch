import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavComponent } from './list-fav.component';

describe('ListFavComponent', () => {
  let component: ListFavComponent;
  let fixture: ComponentFixture<ListFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
