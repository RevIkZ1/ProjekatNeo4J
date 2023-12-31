import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekoviComponent } from './lekovi.component';

describe('LekoviComponent', () => {
  let component: LekoviComponent;
  let fixture: ComponentFixture<LekoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LekoviComponent]
    });
    fixture = TestBed.createComponent(LekoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
