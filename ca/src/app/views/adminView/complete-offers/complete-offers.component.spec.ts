import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOffersComponent } from './complete-offers.component';

describe('CompleteOffersComponent', () => {
  let component: CompleteOffersComponent;
  let fixture: ComponentFixture<CompleteOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteOffersComponent]
    });
    fixture = TestBed.createComponent(CompleteOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
