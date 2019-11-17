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

  constructor() { }

  ngOnInit() { }

  playerTurn(id) {
    const row = id[0];
    const column = id[1];
    if (this.gameFinished == false && this.matrix[row][column] == EMPTY_CELL) {
      this.matrix = this.matrix.map((r, i) => {
        if (row == i) {
          return r.map((c, j) => {
            return column == j ? this.turn : c;
          });
        } else {
          return r;
        }
      });
      this.checkBoard(this.matrix, this.turn, row, column);
      if (this.gameFinished == false) {
        this.turn = this.turn === X ? O : X;
        this.title = "Turno de " + this.turn;
      }
    }
  }

  checkBoard(matrix, currentTurn, posX, posY) {
    if (!( matrix.map(row => { return row.includes(EMPTY_CELL) })).includes(true)) {
      this.title = "Empate";
      this.gameFinished = true;
    } else {
      this.gameFinished = this.checkCells(matrix, currentTurn, posX, posY);
    }
  }

  checkCells(matrix, value, x, y) {
    var n = this.dimension;
    var col = 0;
    var row = 0;
    var diag = 0;
    var rdiag = 0;

    for (var i = 0; i < n; i++) {
      if (matrix[x][i] === value) row++;
      if (matrix[i][y] === value) col++;
      if (matrix[i][i] === value) diag++;
      if (matrix[i][n - (i + 1)] === value) rdiag++;
    }

    if (row === n) {
      // this.setVictoryCells(x*n,1);
      return true;
    } else if (col === n) {
      // this.setVictoryCells(y,n);
      return true;
    } else if (diag === n) {
      // this.setVictoryCells(0,n+1);
      return true;
    } else if (rdiag === n) {
      // this.setVictoryCells(n-1,n-1);
      return true;
    } else {
      return false;
    }
  }

  resetBoard() {
    this.title = "Iniciar partida";
    this.turn = X;
    this.gameFinished = false;
    this.move = 0;
    this.matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
  }

}
