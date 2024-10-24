import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaidPageComponent } from './plaid-page.component';

describe('PlaidPageComponent', () => {
  let component: PlaidPageComponent;
  let fixture: ComponentFixture<PlaidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaidPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
