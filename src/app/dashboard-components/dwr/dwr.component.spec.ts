import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwrComponent } from './dwr.component';

describe('DwrComponent', () => {
  let component: DwrComponent;
  let fixture: ComponentFixture<DwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
