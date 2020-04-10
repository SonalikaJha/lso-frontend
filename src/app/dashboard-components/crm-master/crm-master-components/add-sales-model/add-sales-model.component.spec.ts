import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesModelComponent } from './add-sales-model.component';

describe('AddSalesModelComponent', () => {
  let component: AddSalesModelComponent;
  let fixture: ComponentFixture<AddSalesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
