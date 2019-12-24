import {Component, OnInit} from '@angular/core';
import {PlayerModel} from "../models/player.model";
import {PlayerService} from "../services/player.service";
import { ModalController } from '@ionic/angular';
import { AddPlayerModal } from '../modals/add-player/add-player.modal';
import { BallModel } from '../models/ball.model';
import { ancestorWhere } from 'tslint';
import { FoulModal } from '../modals/foul/foul.modal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'play-tab.html',
  styleUrls: ['play-tab.scss']
})
export class PlayTab implements OnInit {
  players: PlayerModel[] = [];
  player1: PlayerModel;
  player2: PlayerModel;
  gameOn: boolean;
  redBallCount = 15;
  player1Points = 0;
  player2Points = 0;
  colorBalls: BallModel[] = [];
  redBall: BallModel = new BallModel();
  player1Balls: BallModel[] = [];
  player2Balls: BallModel[] = [];
  turn = 0;
  player1Striking = true;
  gameEnded: boolean;

  constructor(
      private playerService: PlayerService,
      private modalCtrl: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    this.setColorBalls();
    this.players.push(...await this.playerService.getPlayers());
  }

  setColorBalls() {
    this.colorBalls = [];

    const yellowBall = new BallModel();
    yellowBall.value = 2;
    yellowBall.color = 'yellow';
    this.colorBalls.push(yellowBall);

    const greenBall = new BallModel();
    greenBall.value = 3;
    greenBall.color = 'green';
    this.colorBalls.push(greenBall);

    const brownBall = new BallModel();
    brownBall.value = 4;
    brownBall.color = 'brown';
    this.colorBalls.push(brownBall);

    const blueBall = new BallModel();
    blueBall.value = 5;
    blueBall.color = 'blue';
    this.colorBalls.push(blueBall);

    const pinkBall = new BallModel();
    pinkBall.value = 6;
    pinkBall.color = 'pink';
    this.colorBalls.push(pinkBall);

    const blackBall = new BallModel();
    blackBall.value = 7;
    blackBall.color = 'black';
    this.colorBalls.push(blackBall);
  }

  async addPlayer(): Promise<PlayerModel> {
    return new Promise(async (resolve) => {
      const modal = await this.modalCtrl.create({
        component: AddPlayerModal
      });

      await modal.present();

      modal.onDidDismiss()
          .then((player) => {
            resolve(player.data);
          });
    })
  }

  async selectPlayer(playerNumber: number, event: any) {
    let player;

    if (event.detail.value === 'add') {
      player = await this.addPlayer();
      this.players.push(player);
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

  /**
   * Reset game values
   **/
  newGame() {
    this.gameOn = true;
    this.redBallCount = 15;
    this.player1Points = 0;
    this.player2Points = 0;
    this.player1Balls = [];
    this.player2Balls = [];

    this.setColorBalls();
  }

  redPotted() {
    this.player1Striking ? this.player1Points++ : this.player2Points++;
    this.player1Striking ? this.player1Balls.push(new BallModel()) : this.player2Balls.push(new BallModel());
    this.redBallCount--;
    this.turn++;
  }

  colorPotted(ball: BallModel) {
    this.player1Striking ? this.player1Points += ball.value : this.player2Points += ball.value;

    const ballToAdd = new BallModel();
    ballToAdd.value = ball.value;
    ballToAdd.color = ball.color;
    this.player1Striking ? this.player1Balls.push(ballToAdd) : this.player2Balls.push(ballToAdd);

    if (this.redBallCount === 0) {
      this.colorBalls.splice(this.colorBalls.indexOf(ball), 1);
    }

    this.turn++;
  }

  changePlayer() {
    this.turn = 0;
    this.player1Striking = !this.player1Striking;
  }

  async foul() {
    const foulModal = await this.modalCtrl.create({
      component: FoulModal
    });

    foulModal.onDidDismiss()
        .then((foul) => {
          if (foul.data.value) {
            this.player1Striking ? this.player2Points += foul.data.value : this.player1Points += foul.data.value;
          }

          if (foul.data.removeRed) {
            this.redBallCount--;
          }

          if (foul.data.switchPlayer) {
            this.player1Striking = !this.player1Striking;
          }
        });

    await foulModal.present();
  }

  async gameOver() {
    this.player1.gamesPlayed++;
    this.player1.points += this.player1Points;
    this.player1Points > this.player2Points ? this.player1.wins++ : this.player1.losses++;

    this.player2.gamesPlayed++;
    this.player2.points += this.player2Points;
    this.player2Points > this.player1Points ? this.player2.wins++ : this.player2.losses++;

    await this.playerService.updateStats(this.player1, this.player2);

    this.gameEnded = true;
  }
}
