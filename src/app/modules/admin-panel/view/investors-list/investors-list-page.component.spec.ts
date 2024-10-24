import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsListPageComponent } from './investors-list-page.component';

describe('AdminDashboardComponent', () => {
  let component: InvestorsListPageComponent;
  let fixture: ComponentFixture<InvestorsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestorsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestorsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
