import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
import {PlayerModel} from "../models/player.model";

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerCache: PlayerModel[] = [];

  constructor() { }

  async addPlayer(name: string, image: string) {
    const playerModel = new PlayerModel();
    playerModel.id = this.playerCache.length;
    playerModel.name = name;
    playerModel.image = image;

    return await Storage.set({ key: `player/${playerModel.id}`, value: JSON.stringify(playerModel) });
  }

  async getPlayers() {
    if (this.playerCache.length > 0) {
      return this.playerCache;
    }

    const players: PlayerModel[] = [];
    const keys = await Storage.keys();

    for (const key of keys.keys) {
      const player = await Storage.get({ key: key });
      players.push(JSON.parse(player.value));
    }
    this.playerCache.push(...players);
    return players;
  }
}
