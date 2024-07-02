import { Component,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as playerIdsData from 'src/assets/player_id.json';

interface PlayerIds {
  [key: string]: string;
}

const playerIds: PlayerIds = playerIdsData as PlayerIds;

@Component({
  selector: 'app-player-placard',
  templateUrl: './player-placard.component.html',
  styleUrls: ['./player-placard.component.css'],
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
        style({ transform: 'scale(0.5)', opacity: 0 }), // Start small and invisible
        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 })) // Scale to full size and fade in
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'scale(0.5)', opacity: 0 })) // Scale down and fade out
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
export class PlayerPlacardComponent {
  squads: any[] = [];
  selectedTeam1: string = '';
  selectedTeam2: string = '';// Default team selection
  clickedButtons: Set<number> = new Set<number>();
  clickedButtonTeam1: Set<number> = new Set<number>();
  clickedButtonTeam2: Set<number> = new Set<number>();
  counter: number = 0;
  counterTeam1: number = 0;
  counterTeam2: number = 0;
  overlayIndex: number | null = null;
  animationState: boolean = false;
  rotateIndex: number | null = null;
  private baseUrl: string = "https://assets-icc.sportz.io/cricket/v1/player";
  private clientId: string = "tPZJbRgIub3Vua93%2FDWtyQ%3D%3D";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/squad.json').subscribe((data: any) => {
      this.squads = data.teams;
    });
  }

  getTeamSquad(teamName: string) {
    const team = this.squads.find(t => t.team_name === teamName);
    return team ? team.squad : [];
  }

  onButtonClick(index: number) {
    if (!this.clickedButtons.has(index)) {
      this.clickedButtons.add(index);
      this.counter++;
    }
    console.log(this.clickedButtonTeam1)
  }
  onButtonClickTeam1(index: number) {
    if (!this.clickedButtonTeam1.has(index)) {
      this.clickedButtonTeam1.add(index);
      this.counterTeam1++;
    }
    console.log(this.clickedButtons)
  }
  onButtonClickTeam2(index: number) {
    if (!this.clickedButtonTeam2.has(index)) {
      this.clickedButtonTeam2.add(index);
      this.counterTeam2++;
    }
    console.log(this.clickedButtonTeam2)
  }

  removePlayer(i: number) {
    this.counter--;
    this.clickedButtons.delete(i);
  }

  removePlayerTeam1(i: number) {
    this.counterTeam1--;
    this.clickedButtonTeam1.delete(i);
  }

  removePlayerTeam2(i: number) {
    this.counterTeam2--;
    this.clickedButtonTeam2.delete(i);
  }

  getFilteredTeams(teamName: string) {
    const team = this.squads.find(t => t.team_name !== teamName);
    return team ? team.squad : [];
  }

  getFinalCount(index: number) {
    return index + this.counter;
  }

  toggleOverlay(index: number) {
    console.log("toggle")
    this.overlayIndex = this.overlayIndex === index ? null : index;
    this.rotateIndex = null;
  }

  onFadeInDone(event: any, index: number) {
    if (event.toState === 'void') return;
    this.rotateIndex = index;
  }

  constructImageUrl(playerName: any) {
    const basePath = "https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/6122/"
    const defaultImageId = "default.png";
    const playerId = playerIds[playerName];
    return playerId ? `${basePath}${playerId}.png` : `${basePath}${defaultImageId}`;
  }

  generatePlayerAsset(playerName: string,teamName: any) {
    const playerId = playerIds[playerName];
    var assetUrl = "";
    let playerAsset: any = {};
    if (playerId) {
      assetUrl = `${this.baseUrl}?client_id=${this.clientId}&feed_format=json&lang=en&player_id=${playerId}`;
      this.http.get(assetUrl).subscribe(
        (data) => {
          playerAsset = data;
          const team: any = this.squads.find(t => t.team_name === teamName);
          const playerDetails = team.squad.find((p: { name: string; }) => p.name === playerName);
          if (playerDetails.role == "Batsman" || playerDetails.role == "Wicketkeeper") {
            playerDetails.playerStatsBatsman.Runs = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.runs;
            playerDetails.playerStatsBatsman.Average = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.average;
            playerDetails.playerStatsBatsman.SR = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.strike_rate;
            playerDetails.playerStatsBatsman['4s'] = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.fours;
            playerDetails.playerStatsBatsman['6s'] = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.sixes;
            playerDetails.playerStatsBatsman.Matches = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.matches;
            playerDetails.playerStatsBatsman.Innings = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.batting_record.innings;

          }
          else {
            playerDetails.playerStatsBowler.Wickets = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.bowling_record.wickets;
            playerDetails.playerStatsBowler.Average = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.bowling_record.average;
            playerDetails.playerStatsBowler.Matches = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.bowling_record.matches;
            playerDetails.playerStatsBowler.Innings = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.bowling_record.innings;
            playerDetails.playerStatsBowler.Economy = playerAsset.data.profile.stats.format.find((format: { comp_type: string; }) => format.comp_type === "T20I").overall.bowling_record.economy_rate;

          }
          console.log('Player asset retrieved successfully:', playerAsset);

        },
        (error) => {
          console.error('Error fetching player asset:', error);
        }
      );
    } else {
      console.error('Player ID not found for:', playerName);
    }

  }



}
