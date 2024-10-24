import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvestorModalComponent } from './delete-investor-modal.component';

describe('DeleteInvestorModalComponent', () => {
  let component: DeleteInvestorModalComponent;
  let fixture: ComponentFixture<DeleteInvestorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteInvestorModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteInvestorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
