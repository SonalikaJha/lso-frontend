import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientTypeComponent } from './add-client-type.component';

describe('AddClientTypeComponent', () => {
  let component: AddClientTypeComponent;
  let fixture: ComponentFixture<AddClientTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
