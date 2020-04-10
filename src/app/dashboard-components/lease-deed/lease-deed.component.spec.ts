import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseDeedComponent } from './lease-deed.component';

describe('LeaseDeedComponent', () => {
  let component: LeaseDeedComponent;
  let fixture: ComponentFixture<LeaseDeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseDeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
