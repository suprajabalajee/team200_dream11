import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { PlayerService } from 'src/app/services/player.service';
import * as playerIdsData from 'src/assets/player_id.json';

interface PlayerIds {
  [key: string]: string;
}

const playerIds: PlayerIds = playerIdsData as PlayerIds;

@Component({
  selector: 'app-player-fantasy-placard',
  templateUrl: './player-fantasy-placard.component.html',
  styleUrls: ['./player-fantasy-placard.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(360deg)', offset: 1.0 })
        ]))
      ])
    ]),
    trigger('swirl', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('{{ delay }}s', style({ opacity: 1 })),
      ], { params: { delay: 0 } })
    ]),
  ]
})
export class PlayerFantasyPlacardComponent implements OnInit {
  selectedTeam1: string = '';
  selectedTeam2: string = ''; // Default team selection
  clickedButtons: Set<number> = new Set<number>();
  clickedButtonTeam1: Set<number> = new Set<number>();
  clickedButtonTeam2: Set<number> = new Set<number>();
  counter: number = 0;
  counterTeam1: number = 0;
  counterTeam2: number = 0;
  overlayIndex: number | null = null;
  animationState: boolean = false;
  rotateIndex: number | null = null;
  totalSelected: number = 0;
  wicketKeeper: number = 0;
  batsman: number = 0;
  allRounder: number = 0;
  bowler: number = 0;
  isOverlaySubmitVisible = false;
  batsmen: any[] = [];
  bowlers: any[] = [];
  allRounders: any[] = [];
  wicketKeepers: any[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.loadSquads().subscribe((data: any) => {
      this.playerService.setSquads(data.teams);
    });
  }

  get squads() {
    return this.playerService.squads;
  }


  getTeamSquad(teamName: string) {
    return this.playerService.getTeamSquad(teamName);
  }

  onButtonClick(index: number) {
    if (!this.clickedButtons.has(index)) {
      this.clickedButtons.add(index);
      this.counter++;
    }
    console.log(this.clickedButtonTeam1);
  }

  onButtonClickTeam1(index: number) {
    if (!this.clickedButtonTeam1.has(index)) {
      this.clickedButtonTeam1.add(index);
      this.counterTeam1++;
      const team = this.playerService.getTeamSquad(this.selectedTeam1);
      const playerRole = team[index].role;
      switch (playerRole) {
        case 'Wicketkeeper': {
          this.wicketKeeper++;
          break;
        }
        case 'Batsman': {
          this.batsman++;
          break;
        }
        case 'Bowler': {
          this.bowler++;
          break;
        }
        case 'All-rounder': {
          this.allRounder++;
          break;
        }
        default: {
          this.allRounder++;
        }
      }
      this.totalSelected++;
    }
    console.log(this.totalSelected);
  }

  onButtonClickTeam2(index: number) {
    if (!this.clickedButtonTeam2.has(index)) {
      this.clickedButtonTeam2.add(index);
      this.counterTeam2++;
      const team = this.playerService.getTeamSquad(this.selectedTeam2);
      const playerRole = team[index - 15].role;
      switch (playerRole) {
        case 'Wicketkeeper': {
          this.wicketKeeper++;
          break;
        }
        case 'Batsman': {
          this.batsman++;
          break;
        }
        case 'Bowler': {
          this.bowler++;
          break;
        }
        case 'All-rounder': {
          this.allRounder++;
          break;
        }
        default: {
          this.allRounder++;
        }
      }
      this.totalSelected++;
    }
    console.log(this.totalSelected);
  }

  removePlayer(i: number) {
    this.counter--;
    this.clickedButtons.delete(i);
  }

  removePlayerTeam1(i: number) {
    this.counterTeam1--;
    this.clickedButtonTeam1.delete(i);
    this.totalSelected--;
    const team = this.playerService.getTeamSquad(this.selectedTeam1);
    const playerRole = team[i].role;
    switch (playerRole) {
      case 'Wicketkeeper': {
        this.wicketKeeper--;
        break;
      }
      case 'Batsman': {
        this.batsman--;
        break;
      }
      case 'Bowler': {
        this.bowler--;
        break;
      }
      case 'All-rounder': {
        this.allRounder--;
        break;
      }
      default: {
        // do nothing
      }
    }
  }

  removePlayerTeam2(i: number) {
    this.counterTeam2--;
    this.clickedButtonTeam2.delete(i);
    this.totalSelected--;
    const team = this.playerService.getTeamSquad(this.selectedTeam1);
    const playerRole = team[i].role;
    switch (playerRole) {
      case 'Wicketkeeper': {
        this.wicketKeeper--;
        break;
      }
      case 'Batsman': {
        this.batsman--;
        break;
      }
      case 'Bowler': {
        this.bowler--;
        break;
      }
      case 'All-rounder': {
        this.allRounder--;
        break;
      }
      default: {
        // do nothing
      }
    }
  }

  toggleOverlay(index: number) {
    console.log('toggle');
    this.overlayIndex = this.overlayIndex === index ? null : index;
    this.rotateIndex = null;
  }

  onFadeInDone(event: any, index: number) {
    if (event.toState === 'void') return;
    this.rotateIndex = index;
  }

  constructImageUrl(playerName: any) {
    return this.playerService.constructImageUrl(playerName, playerIds);
  }

  generatePlayerAsset(playerName: string, teamName: any) {
    this.playerService.generatePlayerAsset(playerName, teamName, playerIds).subscribe(
      (data) => {
        const team: any = this.playerService.getTeamSquad(teamName);
        const playerDetails = team.find((p: { name: string }) => p.name === playerName);
        if (playerDetails.role == 'Batsman' || playerDetails.role == 'Wicketkeeper') {
          playerDetails.playerStatsBatsman.Runs = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.runs;
          playerDetails.playerStatsBatsman.Average = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.average;
          playerDetails.playerStatsBatsman.SR = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.strike_rate;
          playerDetails.playerStatsBatsman['4s'] = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.fours;
          playerDetails.playerStatsBatsman['6s'] = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.sixes;
          playerDetails.playerStatsBatsman.Matches = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.matches;
          playerDetails.playerStatsBatsman.Innings = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.batting_record.innings;
        } else {
          playerDetails.playerStatsBowler.Wickets = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.bowling_record.wickets;
          playerDetails.playerStatsBowler.Average = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.bowling_record.average;
          playerDetails.playerStatsBowler.Matches = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.bowling_record.matches;
          playerDetails.playerStatsBowler.Innings = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.bowling_record.innings;
          playerDetails.playerStatsBowler.Economy = data.data.profile.stats.format.find((format: { comp_type: string }) => format.comp_type === 'T20I').overall.bowling_record.economy_rate;
        }
        console.log('Player asset retrieved successfully:', data);
      },
      (error) => {
        console.error('Error fetching player asset:', error);
      }
    );
  }

  onSubmit() {
    //this.isOverlaySubmitVisible = true;
    this.populatePlayerRoles();
    const selectedPlayers = [...this.clickedButtonTeam1, ...this.clickedButtonTeam2].map(index => {
      const team = this.playerService.getTeamSquad(this.selectedTeam1).concat(this.playerService.getTeamSquad(this.selectedTeam2));
      return team[index]?.name;
    });
    //Constructing the model:
    console.log(this.constructJsonRequestBody());
    this.playerService.saveSelectedPlayers(selectedPlayers.filter(player => player !== undefined));
  }

  constructJsonRequestBody() {
    const team1Players = this.playerService.getTeamSquad(this.selectedTeam1);
    const team2Players = this.playerService.getTeamSquad(this.selectedTeam2);

    const allPlayers = team1Players.concat(team2Players);

    const record = allPlayers.map(player => ({
      batsmanName: player.name,
      battingPos: this.getBattingPosition(player)
    }));

    return {
      match: `${this.selectedTeam1} Vs ${this.selectedTeam2}`,
      record: record
    };
  }

  getBattingPosition(player: any): number {
    // Implement your logic to determine the batting position of a player.
    // For demonstration, assigning random positions (this should be replaced with actual logic).
    return Math.floor(Math.random() * 11) + 1;
  }

  isSelectionValid() {
    if (this.totalSelected == 11 && this.batsman >= 3 && this.batsman < 6 && this.bowler >= 3 && this.bowler < 6
      && this.allRounder >= 1 && this.allRounder < 4 && this.wicketKeeper >= 1 &&
      this.wicketKeeper < 4) {
      return true;
    }
    console.log(this.batsman)
    console.log(this.bowler)
    console.log(this.wicketKeeper)
    console.log(this.allRounder)
      return false;
    
  }

  closeOverlay() {
    this.isOverlaySubmitVisible = false;
  }

  populatePlayerRoles() {
    const selectedPlayers = [...this.clickedButtonTeam1, ...this.clickedButtonTeam2].map(index => {
      const team = this.playerService.getTeamSquad(this.selectedTeam1).concat(this.playerService.getTeamSquad(this.selectedTeam2));
      return team[index];
    });

    this.batsmen = selectedPlayers.filter(player => player.role === 'Batsman');
    this.bowlers = selectedPlayers.filter(player => player.role === 'Bowler');
    this.allRounders = selectedPlayers.filter(player => player.role === 'All-rounder');
    this.wicketKeepers = selectedPlayers.filter(player => player.role === 'Wicketkeeper');
  }
}
