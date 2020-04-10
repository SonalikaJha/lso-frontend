import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadSourceComponent } from './add-lead-source.component';

describe('AddLeadSourceComponent', () => {
  let component: AddLeadSourceComponent;
  let fixture: ComponentFixture<AddLeadSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeadSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
