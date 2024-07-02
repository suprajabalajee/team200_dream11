import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateMatchComponent } from './simulate-match.component';

describe('SimulateMatchComponent', () => {
  let component: SimulateMatchComponent;
  let fixture: ComponentFixture<SimulateMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
