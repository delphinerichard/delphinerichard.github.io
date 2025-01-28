import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPdfOnlyComponent } from './contact-pdf-only.component';

describe('ContactPdfOnlyComponent', () => {
  let component: ContactPdfOnlyComponent;
  let fixture: ComponentFixture<ContactPdfOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPdfOnlyComponent]
    });
    fixture = TestBed.createComponent(ContactPdfOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
