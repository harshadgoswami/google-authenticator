import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reset2FAComponent } from './reset2-fa.component';

describe('Reset2FAComponent', () => {
  let component: Reset2FAComponent;
  let fixture: ComponentFixture<Reset2FAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reset2FAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reset2FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
