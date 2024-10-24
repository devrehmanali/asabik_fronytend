import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpPageComponent } from './sign-up-page.component';

describe('LoginPageComponent', () => {
  let component: SingUpPageComponent;
  let fixture: ComponentFixture<SingUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingUpPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
