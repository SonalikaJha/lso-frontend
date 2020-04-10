import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuListComponent } from './sidebar-menu-list.component';

describe('SidebarMenuListComponent', () => {
  let component: SidebarMenuListComponent;
  let fixture: ComponentFixture<SidebarMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
