import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomocnoosobljeComponent } from './pomocnoosoblje.component';

describe('PomocnoosobljeComponent', () => {
  let component: PomocnoosobljeComponent;
  let fixture: ComponentFixture<PomocnoosobljeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomocnoosobljeComponent]
    });
    fixture = TestBed.createComponent(PomocnoosobljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
