import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenavComponent } from './admin-sidenav.component';

describe('AdminSidenavCompnent', () => {
  let component: AdminSidenavComponent;
  let fixture: ComponentFixture<AdminSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
