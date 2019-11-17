import { Component, OnInit } from '@angular/core';

const X = "X";
const O = "O";
const EMPTY_CELL = "";

@Component({
  selector: 'app-tres-en-raya',
  templateUrl: './tres-en-raya.page.html',
  styleUrls: ['./tres-en-raya.page.scss'],
})
export class TresEnRayaPage implements OnInit {

  title = "Iniciar partida";
  dimension = 3;
  turn = X;
  gameFinished = false;
  move = 0;
  matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));

  constructor() {}

  ngOnInit() {}

  playerTurn(id) {
    const row = id[0];
    const column = id[1];
    this.matrix = this.matrix.map((r, i) => {
      if (row == i) {
        return r.map((c, j) => {
          return column == j ? this.turn : c;
        });
      } else {
        return r;
      }
    });
}

  resetBoard() {
    this.title = "Iniciar partida";
    this.turn = X;
    this.gameFinished = false;
    this.move = 0;
    this.matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
}

}
