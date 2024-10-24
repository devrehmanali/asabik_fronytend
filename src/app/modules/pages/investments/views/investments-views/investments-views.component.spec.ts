import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsViewsComponent } from './investments-views.component';

describe('InvestmentsViewsComponent', () => {
  let component: InvestmentsViewsComponent;
  let fixture: ComponentFixture<InvestmentsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentsViewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
