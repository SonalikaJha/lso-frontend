import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeadsComponent } from './view-leads.component';

describe('ViewLeadsComponent', () => {
  let component: ViewLeadsComponent;
  let fixture: ComponentFixture<ViewLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
