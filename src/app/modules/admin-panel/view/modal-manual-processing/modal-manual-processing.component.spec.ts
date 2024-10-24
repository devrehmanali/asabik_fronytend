import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManualProcessingComponent } from './modal-manual-processing.component';

describe('ModalManualProcessingComponent', () => {
  let component: ModalManualProcessingComponent;
  let fixture: ComponentFixture<ModalManualProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalManualProcessingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalManualProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
