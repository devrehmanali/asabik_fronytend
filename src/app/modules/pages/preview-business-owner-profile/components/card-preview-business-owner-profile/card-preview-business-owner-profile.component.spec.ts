import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewBusinessOwnerProfileComponent } from './card-preview-business-owner-profile.component';

describe('CardPreviewBusinessOwnerProfileComponent', () => {
  let component: CardPreviewBusinessOwnerProfileComponent;
  let fixture: ComponentFixture<CardPreviewBusinessOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPreviewBusinessOwnerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPreviewBusinessOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
