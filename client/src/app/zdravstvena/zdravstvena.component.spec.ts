import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdravstvenaComponent } from './zdravstvena.component';

describe('ZdravstvenaComponent', () => {
  let component: ZdravstvenaComponent;
  let fixture: ComponentFixture<ZdravstvenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZdravstvenaComponent]
    });
    fixture = TestBed.createComponent(ZdravstvenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
