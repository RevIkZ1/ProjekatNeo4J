import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijenttComponent } from './pacijentt.component';

describe('PacijenttComponent', () => {
  let component: PacijenttComponent;
  let fixture: ComponentFixture<PacijenttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacijenttComponent]
    });
    fixture = TestBed.createComponent(PacijenttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
