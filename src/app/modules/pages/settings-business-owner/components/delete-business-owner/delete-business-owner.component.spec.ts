import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusinessOwnerComponent } from './delete-business-owner.component';

describe('DeleteBusinessOwnerComponent', () => {
  let component: DeleteBusinessOwnerComponent;
  let fixture: ComponentFixture<DeleteBusinessOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBusinessOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteBusinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
