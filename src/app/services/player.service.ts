import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public squads: any[] = [];
  private selectedPlayers: string[] = [];
  private baseUrl: string = "https://assets-icc.sportz.io/cricket/v1/player";
  private clientId: string = "tPZJbRgIub3Vua93%2FDWtyQ%3D%3D";

  constructor(private http: HttpClient) { }

  loadSquads(): Observable<any> {
    return this.http.get('assets/squad.json');
  }

  setSquads(squads: any[]): void {
    this.squads = squads;
  }

  getSquads(): any[] {
    return this.squads;
  }

  getTeamSquad(teamName: string): any[] {
    const team = this.squads.find(t => t.team_name === teamName);
    return team ? team.squad : [];
  }

  constructImageUrl(playerName: any, playerIds: { [key: string]: string }): string {
    const basePath = "https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg/prd/assets/players/6122/"
    const defaultImageId = "default.png";
    const playerId = playerIds[playerName];
    return playerId ? `${basePath}${playerId}.png` : `${basePath}${defaultImageId}`;
  }

  generatePlayerAsset(playerName: string, teamName: any, playerIds: { [key: string]: string }): Observable<any> {
    const playerId = playerIds[playerName];
    const assetUrl = `${this.baseUrl}?client_id=${this.clientId}&feed_format=json&lang=en&player_id=${playerId}`;
    return this.http.get(assetUrl);
  }

  saveSelectedPlayers(players: string[]): void {
    this.selectedPlayers = players;
    console.log('Selected players saved:', this.selectedPlayers);
  }

  getSelectedPlayers(): string[] {
    return this.selectedPlayers;
  }
}
