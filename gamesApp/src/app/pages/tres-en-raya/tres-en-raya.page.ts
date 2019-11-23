import { Component, OnInit } from '@angular/core';

const X = "X";
const O = "O";
const EMPTY_CELL = "";
const MANUAL_MODE = "manual";
const EASY_MODE = "easy";

@Component({
  selector: 'app-tres-en-raya',
  templateUrl: './tres-en-raya.page.html',
  styleUrls: ['./tres-en-raya.page.scss'],
})
export class TresEnRayaPage implements OnInit {

  mode = EASY_MODE;
  title = "Iniciar partida";
  dimension = 3;
  turn = X;
  gameFinished = false;
  move = 0;
  matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
  victoryCells = Array(this.dimension).fill(EMPTY_CELL);

  constructor() { }

  ngOnInit() { }

  // MARK: Auxiliar functions

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isThereEmptyCell(matrix) {
    return (matrix.map(row => { return row.includes(EMPTY_CELL) })).includes(true);
  }

  writeInMatrix(row, column, value) {
    this.matrix = this.matrix.map((r, i) => {
      if (row == i) {
        return r.map((c, j) => {
          return column == j ? value : c;
        });
      } else {
        return r;
      }
    });
  }

  getRandomEmptyCell() {
    var emptyCells = this.matrix.map((row, i) => {
      return row.map((element, j) => {
        if (element === "") {
          return (i * this.dimension) + j;
        }
      });
    }).map(row => {
      return row.filter(Number.isFinite);
    });
    var emptyIds = emptyCells[0];
    for (var i = 1; i < emptyCells.length; i++) {
      emptyIds = emptyIds.concat(emptyCells[i]);
    }
    var number = this.getRandomNumber(0, emptyIds.length - 1);
    return emptyIds[number];
  }

  // MARK: Main functions

  playerTurn(id) {
    const row = parseInt(id[0]);
    const column = parseInt(id[1]);
    if (!this.gameFinished && typeof row !== "undefined" && typeof column !== "undefined" && this.matrix[row][column] == EMPTY_CELL) {
      this.move++;
      this.writeInMatrix(row, column, this.turn);
      this.checkGame(row, column);
      if (!this.gameFinished && this.mode != MANUAL_MODE) {
        this.computersTurn();
      }
    }
  }

  resetBoard() {
    this.title = "Iniciar partida";
    this.turn = X;
    this.gameFinished = false;
    this.move = 0;
    this.matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
    this.victoryCells = Array(this.dimension).fill(EMPTY_CELL);
  }

  setGameMode(mode) {
    this.mode = mode;
    this.resetBoard();
  }

  // MARK: Board functions

  checkGame(row, column) {
    this.gameFinished = this.checkCells(this.matrix, this.turn, row, column);
    if (this.gameFinished == false) {
      this.turn = this.turn === X ? O : X;
      this.title = "Turno de " + this.turn;
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
      this.setVictoryCells(x * n, 1);
      return true;
    } else if (col === n) {
      this.setVictoryCells(y, n);
      return true;
    } else if (diag === n) {
      this.setVictoryCells(0, n + 1);
      return true;
    } else if (rdiag === n) {
      this.setVictoryCells(n - 1, n - 1);
      return true;
    } else if (!this.isThereEmptyCell(matrix)) {
      this.title = "Empate";
      return true;
    } else {
      return false;
    }
  }

  setVictoryCells(init, sum) {
    this.title = "Victoria de " + this.matrix[Math.floor(init / this.dimension)][Math.floor(init % this.dimension)];
    for (var i = 0; i < this.dimension; i++) {
      this.victoryCells[i] = init + (i * sum);
    }
  }

  // MARK: Computer functions

  computersTurn() {
    var id = this.chooseCell();
    var row = Math.floor(id / this.dimension);
    var column = Math.floor(id % this.dimension);
    if (this.matrix[row][column] == EMPTY_CELL) {
      this.writeInMatrix(row, column, this.turn);
      this.checkGame(row, column);
    }
  }

  chooseCell() {
    var choice = this.tryToWin(O);
    if (choice != -1) {
      return choice;
    } else {
      choice = this.tryToWin(X);
      if (choice != -1) {
        return choice;
      } else {
        return this.mode == EASY_MODE ? this.getRandomEmptyCell() : this.studyMove();
      }
    }
  }

  tryToWin(value) {
    //Primera fila
    if (this.matrix[0][0] == value && this.matrix[0][1] == value && this.matrix[0][2] == EMPTY_CELL) {
      return 2;
    } else if (this.matrix[0][0] == value && this.matrix[0][2] == value && this.matrix[0][1] == EMPTY_CELL) {
      return 1;
    } else if (this.matrix[0][1] == value && this.matrix[0][2] == value && this.matrix[0][0] == EMPTY_CELL) {
      return 0;
    }
    //Segunda fila
    else if (this.matrix[1][0] == value && this.matrix[1][1] == value && this.matrix[1][2] == EMPTY_CELL) {
      return 5;
    } else if (this.matrix[1][0] == value && this.matrix[1][2] == value && this.matrix[1][1] == EMPTY_CELL) {
      return 4;
    } else if (this.matrix[1][1] == value && this.matrix[1][2] == value && this.matrix[1][0] == EMPTY_CELL) {
      return 3;
    }
    //Tercera fila
    else if (this.matrix[2][0] == value && this.matrix[2][1] == value && this.matrix[2][2] == EMPTY_CELL) {
      return 8;
    } else if (this.matrix[2][0] == value && this.matrix[2][2] == value && this.matrix[2][1] == EMPTY_CELL) {
      return 7;
    } else if (this.matrix[2][1] == value && this.matrix[2][2] == value && this.matrix[2][0] == EMPTY_CELL) {
      return 6;
    }
    //Primera columna
    else if (this.matrix[0][0] == value && this.matrix[1][0] == value && this.matrix[2][0] == EMPTY_CELL) {
      return 6;
    } else if (this.matrix[0][0] == value && this.matrix[2][0] == value && this.matrix[1][0] == EMPTY_CELL) {
      return 3;
    } else if (this.matrix[1][0] == value && this.matrix[2][0] == value && this.matrix[0][0] == EMPTY_CELL) {
      return 0;
    }
    //Segunda columna
    else if (this.matrix[0][1] == value && this.matrix[1][1] == value && this.matrix[2][1] == EMPTY_CELL) {
      return 7;
    } else if (this.matrix[0][1] == value && this.matrix[2][1] == value && this.matrix[1][1] == EMPTY_CELL) {
      return 4;
    } else if (this.matrix[1][1] == value && this.matrix[2][1] == value && this.matrix[0][1] == EMPTY_CELL) {
      return 1;
    }
    //Tercera columna
    else if (this.matrix[0][2] == value && this.matrix[1][2] == value && this.matrix[2][2] == EMPTY_CELL) {
      return 8;
    } else if (this.matrix[0][2] == value && this.matrix[2][2] == value && this.matrix[1][2] == EMPTY_CELL) {
      return 5;
    } else if (this.matrix[1][2] == value && this.matrix[2][2] == value && this.matrix[0][2] == EMPTY_CELL) {
      return 2;
    }
    //Primera diagonal
    else if (this.matrix[0][0] == value && this.matrix[1][1] == value && this.matrix[2][2] == EMPTY_CELL) {
      return 8;
    } else if (this.matrix[0][0] == value && this.matrix[2][2] == value && this.matrix[1][1] == EMPTY_CELL) {
      return 4;
    } else if (this.matrix[1][1] == value && this.matrix[2][2] == value && this.matrix[0][0] == EMPTY_CELL) {
      return 0;
    }
    //Segunda diagonal
    else if (this.matrix[0][2] == value && this.matrix[1][1] == value && this.matrix[2][0] == EMPTY_CELL) {
      return 6;
    } else if (this.matrix[0][2] == value && this.matrix[2][0] == value && this.matrix[1][1] == EMPTY_CELL) {
      return 4;
    } else if (this.matrix[1][1] == value && this.matrix[2][0] == value && this.matrix[0][2] == EMPTY_CELL) {
      return 2;
    }
    //Otro
    else {
      return -1;
    }
  }

  studyMove() {
    switch (this.move) {
      //Primer turno
      case 1:
        if (this.matrix[0][0] == X || this.matrix[0][2] == X || this.matrix[2][0] == X || this.matrix[2][2] == X) {
          return 4;
        } else if (this.matrix[1][1] == X) {
          return 0;
        } else if (this.matrix[0][1] == X) {
          return 2;
        } else if (this.matrix[1][0] == X) {
          return 6;
        } else {
          return 8;
        }
      //Segundo turno: solo debemos comprobar las opciones que no se hayan descartado anteriormente con la función tryToWin
      case 2:
        if (this.matrix[0][0] == X && this.matrix[1][1] == O) {
          if (this.matrix[1][2] == X) {
            return 1;
          } else {
            return 5;
          }
        } else if (this.matrix[0][1] == X && this.matrix[0][2] == O) {
          if (this.matrix[0][0] == X || this.matrix[1][0] == X) {
            return 8;
          } else if (this.matrix[1][2] == X) {
            return 4;
          } else {
            return 7;
          }
        } else if (this.matrix[0][2] == X && this.matrix[1][1] == O) {
          if (this.matrix[1][0] == X) {
            return 1;
          } else {
            return 3;
          }
        } else if (this.matrix[1][0] == X && this.matrix[2][0] == O) {
          if (this.matrix[0][0] == X || this.matrix[0][1] == X) {
            return 8;
          } else if (this.matrix[2][2] == X) {
            return 5;
          } else {
            return 4;
          }
        } else if (this.matrix[1][1] == X && this.matrix[0][0] == O) {
          return 6;
        } else if (this.matrix[1][2] == X && this.matrix[2][2] == O) {
          if (this.matrix[0][0] == X || this.matrix[2][1] == X) {
            return 4;
          } else if (this.matrix[2][0] == X) {
            return 3;
          } else {
            return 6;
          }
        } else if (this.matrix[2][0] == X && this.matrix[1][1] == O) {
          if (this.matrix[1][2] == X) {
            return 7;
          } else {
            return 3;
          }
        } else if (this.matrix[2][1] == X && this.matrix[2][2] == O) {
          if (this.matrix[1][0] == X || this.matrix[2][0] == X) {
            return 2;
          } else if (this.matrix[0][2] == X) {
            return 1;
          } else {
            return 4;
          }
        } else if (this.matrix[2][2] == X && this.matrix[1][1] == O) {
          if (this.matrix[0][0] == X) {
            return 5;
          } else if (this.matrix[0][1] == X) {
            return 0;
          } else {
            return 7;
          }
        } else {
          return this.getRandomEmptyCell();
        }
      default:
        return this.getRandomEmptyCell();
    }
  }

}
