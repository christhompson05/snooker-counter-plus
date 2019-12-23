import {Component, OnInit} from '@angular/core';
import {PlayerModel} from "../models/player.model";
import {PlayerService} from "../services/player.service";
import { ModalController } from '@ionic/angular';
import { AddPlayerModal } from '../modals/add-player/add-player.modal';

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
      private playerService: PlayerService,
      private modalCtrl: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    this.players.push(...await this.playerService.getPlayers());
  }

  async addPlayer() {
    const modal = await this.modalCtrl.create({
      component: AddPlayerModal
    });

    await modal.present();

    return modal.onDidDismiss()
        .then((player) => {
          return player.data;
        });
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
