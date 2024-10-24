import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonthlyReportsComponent } from './edit-monthly-reports.component';

describe('EditMonthlyReportsComponent', () => {
  let component: EditMonthlyReportsComponent;
  let fixture: ComponentFixture<EditMonthlyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMonthlyReportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMonthlyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
