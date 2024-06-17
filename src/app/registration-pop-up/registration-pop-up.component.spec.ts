import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPopUpComponent } from './registration-pop-up.component';

describe('RegistrationPopUpComponent', () => {
  let component: RegistrationPopUpComponent;
  let fixture: ComponentFixture<RegistrationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
