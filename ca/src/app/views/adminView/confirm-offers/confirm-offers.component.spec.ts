import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOffersComponent } from './confirm-offers.component';

describe('ConfirmOffersComponent', () => {
  let component: ConfirmOffersComponent;
  let fixture: ComponentFixture<ConfirmOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmOffersComponent]
    });
    fixture = TestBed.createComponent(ConfirmOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
