import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwTempComponent } from './veiw-temp.component';

describe('VeiwTempComponent', () => {
  let component: VeiwTempComponent;
  let fixture: ComponentFixture<VeiwTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
