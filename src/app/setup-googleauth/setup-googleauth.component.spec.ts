import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupGoogleauthComponent } from './setup-googleauth.component';

describe('SetupGoogleauthComponent', () => {
  let component: SetupGoogleauthComponent;
  let fixture: ComponentFixture<SetupGoogleauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupGoogleauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupGoogleauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
