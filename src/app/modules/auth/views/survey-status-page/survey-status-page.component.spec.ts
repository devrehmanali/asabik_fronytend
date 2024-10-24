import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyStatusPageComponent } from './survey-status-page.component';

describe('SurveyStatusPageComponent', () => {
  let component: SurveyStatusPageComponent;
  let fixture: ComponentFixture<SurveyStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyStatusPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
