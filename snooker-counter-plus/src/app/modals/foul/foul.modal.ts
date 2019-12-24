import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'foul-modal',
  templateUrl: 'foul.modal.html',
  styleUrls: ['foul.modal.scss']
})
export class FoulModal {
  redBall: FormControl = new FormControl();
  switchPlayer: FormControl = new FormControl();
  foulValue: FormControl = new FormControl('4');

  constructor(
      private modalCtrl: ModalController
  ) {
  }

  async submitFoul() {
    await this.modalCtrl.dismiss({
      value: Number.parseInt(this.foulValue.value),
      removeRed: this.redBall.value,
      switchPlayer: this.switchPlayer.value
    });
  }
}