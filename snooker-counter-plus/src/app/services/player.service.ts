import { Injectable } from '@angular/core';
import { CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins } from "@capacitor/core";
import { PlayerModel } from "../models/player.model";

const { Camera, Filesystem, Storage } = Plugins;

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

  async getPlayers(): Promise<PlayerModel[]> {
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

  async setImage(): Promise<string> {
    const originalPhoto = await Camera.getPhoto({
      source: CameraSource.Prompt,
      saveToGallery: true,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });

    let date = new Date(),
        time = date.getTime(),
        fileName = time + ".jpeg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName
    });

    const photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    return photoPath;
  }
}
