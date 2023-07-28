import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetsComponent } from './password-resets.component';

describe('PasswordResetsComponent', () => {
  let component: PasswordResetsComponent;
  let fixture: ComponentFixture<PasswordResetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetsComponent]
    });
    fixture = TestBed.createComponent(PasswordResetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
