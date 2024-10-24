import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessOwnerProfileComponent } from './edit-business-owner-profile.component';

describe('EditBusinessOwnerProfileComponent', () => {
  let component: EditBusinessOwnerProfileComponent;
  let fixture: ComponentFixture<EditBusinessOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBusinessOwnerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBusinessOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
