import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessSurveyPageComponent } from './business-survey-page.component';

describe('BusinessSurveyPageComponent', () => {
  let component: BusinessSurveyPageComponent;
  let fixture: ComponentFixture<BusinessSurveyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessSurveyPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
