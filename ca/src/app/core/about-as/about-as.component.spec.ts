import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAsComponent } from './about-as.component';

describe('AboutAsComponent', () => {
  let component: AboutAsComponent;
  let fixture: ComponentFixture<AboutAsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutAsComponent]
    });
    fixture = TestBed.createComponent(AboutAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
