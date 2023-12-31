import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorComponent } from './doktor.component';

describe('DoktorComponent', () => {
  let component: DoktorComponent;
  let fixture: ComponentFixture<DoktorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoktorComponent]
    });
    fixture = TestBed.createComponent(DoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
