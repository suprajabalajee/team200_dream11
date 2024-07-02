import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFantasyPlacardComponent } from './player-fantasy-placard.component';

describe('PlayerFantasyPlacardComponent', () => {
  let component: PlayerFantasyPlacardComponent;
  let fixture: ComponentFixture<PlayerFantasyPlacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerFantasyPlacardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerFantasyPlacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
