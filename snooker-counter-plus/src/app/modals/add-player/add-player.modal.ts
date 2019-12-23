import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'add-player-modal',
  templateUrl: './add-player.modal.html',
  styleUrls: ['./add-player.modal.scss']
})
export class AddPlayerModal implements OnInit {
  name: string;
  nameControl: FormControl = new FormControl();
  imageUrl: string;
  subscription: Subscription = new Subscription();

  constructor(
      private playerService: PlayerService,
      private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.subscription.add(
        this.nameControl.valueChanges.subscribe((value) => {
          this.name = value;
        })
    )
  }

  async addPlayer() {
    const player = await this.playerService.addPlayer(this.name, this.imageUrl);
    await this.modalCtrl.dismiss(player);
  }

  async addOrEditImage() {
    this.imageUrl = await this.playerService.setImage();
    console.log(`image: `, this.imageUrl);
  }
}
