import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPlacardComponent } from './player-placard.component';

describe('PlayerPlacardComponent', () => {
  let component: PlayerPlacardComponent;
  let fixture: ComponentFixture<PlayerPlacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPlacardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPlacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
