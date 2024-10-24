import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingUpdateComponent } from './rating-update.component';

describe('RatingUpdateComponent', () => {
  let component: RatingUpdateComponent;
  let fixture: ComponentFixture<RatingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
