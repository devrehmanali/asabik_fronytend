import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusienessOwnerModalComponent } from './delete-busieness-owner-modal.component';

describe('DeleteBusienessOwnerModalComponent', () => {
  let component: DeleteBusienessOwnerModalComponent;
  let fixture: ComponentFixture<DeleteBusienessOwnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBusienessOwnerModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteBusienessOwnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
