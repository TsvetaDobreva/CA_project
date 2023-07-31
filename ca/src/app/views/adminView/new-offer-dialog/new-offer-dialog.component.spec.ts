import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferDialogComponent } from './new-offer-dialog.component';

describe('NewOfferDialogComponent', () => {
  let component: NewOfferDialogComponent;
  let fixture: ComponentFixture<NewOfferDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOfferDialogComponent]
    });
    fixture = TestBed.createComponent(NewOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
