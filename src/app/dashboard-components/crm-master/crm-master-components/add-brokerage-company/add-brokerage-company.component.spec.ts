import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerageCompanyComponent } from './add-brokerage-company.component';

describe('AddBrokerageCompanyComponent', () => {
  let component: AddBrokerageCompanyComponent;
  let fixture: ComponentFixture<AddBrokerageCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrokerageCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrokerageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
