import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdravstvenaustanovaComponent } from './zdravstvenaustanova.component';

describe('ZdravstvenaustanovaComponent', () => {
  let component: ZdravstvenaustanovaComponent;
  let fixture: ComponentFixture<ZdravstvenaustanovaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZdravstvenaustanovaComponent]
    });
    fixture = TestBed.createComponent(ZdravstvenaustanovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
