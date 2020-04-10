import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadTypeComponent } from './add-lead-type.component';

describe('AddLeadTypeComponent', () => {
  let component: AddLeadTypeComponent;
  let fixture: ComponentFixture<AddLeadTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeadTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
