import {Component, OnInit} from '@angular/core';
import {PlayerModel} from "../models/player.model";
import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'play-tab.html',
  styleUrls: ['play-tab.scss']
})
export class PlayTab implements OnInit {
  players: PlayerModel[] = [];
  player1: PlayerModel;
  player2: PlayerModel;

  constructor(
      private playerService: PlayerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.players.push(...await this.playerService.getPlayers());
  }

  async addPlayer() {
    console.log(`Adding Player: `);
  }

  async selectPlayer(playerNumber: number, event: any) {
    let player;

    if (event.detail.value === 'add') {
      player = await this.addPlayer();
    } else {
      player = this.players.find((p) => {
        return p.id === Number.parseInt(event.detail.value);
      });
    }

    if (playerNumber === 1) {
      this.player1 = player;
      return;
    }
    this.player2 = player;
  }
}
