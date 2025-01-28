import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherStuffComponent } from './other-stuff.component';

describe('OtherStuffComponent', () => {
  let component: OtherStuffComponent;
  let fixture: ComponentFixture<OtherStuffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherStuffComponent]
    });
    fixture = TestBed.createComponent(OtherStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
