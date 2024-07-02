import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateMatchNormalComponent } from './simulate-match-normal.component';

describe('SimulateMatchNormalComponent', () => {
  let component: SimulateMatchNormalComponent;
  let fixture: ComponentFixture<SimulateMatchNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateMatchNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateMatchNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
