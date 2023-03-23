import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotGoogleauthComponent } from './forgot-googleauth.component';

describe('ForgotGoogleauthComponent', () => {
  let component: ForgotGoogleauthComponent;
  let fixture: ComponentFixture<ForgotGoogleauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotGoogleauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotGoogleauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
