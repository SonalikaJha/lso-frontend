import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMasterComponent } from './crm-master.component';

describe('CrmMasterComponent', () => {
  let component: CrmMasterComponent;
  let fixture: ComponentFixture<CrmMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
