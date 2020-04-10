import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadManagementComponent } from './lead-management.component';

describe('LeadManagementComponent', () => {
  let component: LeadManagementComponent;
  let fixture: ComponentFixture<LeadManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
