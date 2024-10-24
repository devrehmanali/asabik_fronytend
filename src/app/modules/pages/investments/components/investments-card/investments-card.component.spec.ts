import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsCardComponent } from './investments-card.component';

describe('InvestmentsCardComponent', () => {
  let component: InvestmentsCardComponent;
  let fixture: ComponentFixture<InvestmentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
