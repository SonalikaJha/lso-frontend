import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadRequirementComponent } from './add-lead-requirement.component';

describe('AddLeadRequirementComponent', () => {
  let component: AddLeadRequirementComponent;
  let fixture: ComponentFixture<AddLeadRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeadRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
