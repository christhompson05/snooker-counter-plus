import { Component, NgZone, OnInit } from '@angular/core';
import { PlayerModel } from '../models/player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'records-tab.html',
  styleUrls: ['records-tab.scss']
})
export class RecordsTab {
  players: PlayerModel[] = [];
  mostWins: PlayerModel[] = [];
  bestWinPct: PlayerModel[] = [];
  mostPoints: PlayerModel[] = [];
  bestPointPerGame: PlayerModel[] = [];

  constructor(
      private playerService: PlayerService,
      private zone: NgZone
  ) {}

  async ionViewWillEnter(): Promise<void> {
    await this.zone.run(async () => {
      this.players = await this.playerService.getPlayers();
      this.getRecords();
    });
  }

  private async getRecords(): Promise<void> {
    this.mostWins = this.getMostWins();
    this.bestWinPct = this.getBestWinPct();
    this.mostPoints = this.getMostPoints();
    this.bestPointPerGame = this.getBestPointsPerGame();
  }

  private getMostWins() {
    return this.players.sort((a, b) => {
      if (a.wins <= b.wins) {
        return 1;
      }
      return -1;
    });
  }

  private getBestWinPct() {
    return this.players.sort((a, b) => {
      if ((a.wins / a.gamesPlayed) <= (b.wins / b.gamesPlayed)) {
        return 1;
      }
      return -1;
    });
  }

  private getMostPoints() {
    return this.players.sort((a, b) => {
      if (a.points <= b.points) {
        return 1;
      }
      return -1;
    });
  }

  private getBestPointsPerGame() {
    return this.players.sort((a, b) => {
      if ((a.points / a.gamesPlayed) <= (b.points / b.gamesPlayed)) {
        return 1;
      }
      return -1;
    });
  }
}
