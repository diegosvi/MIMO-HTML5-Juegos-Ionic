import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';

const X = "X";
const O = "O";
const EMPTY_CELL = "";
const MANUAL_MODE = "manual";
const EASY_MODE = "easy";
const VICTORY = 0;
const DEFEAT = 1;

@Component({
  selector: 'app-tres-en-raya',
  templateUrl: './tres-en-raya.page.html',
  styleUrls: ['./tres-en-raya.page.scss', '../../app.component.scss'],
})
export class TresEnRayaPage implements OnInit {

  username;
  mode;
  title;
  dimension;
  turn;
  gameFinished;
  matrix;
  victoryCells;
  minimaxOptions = new Map();

  constructor(private storageService: StorageService) {
    this.getUsername();
  }

  ngOnInit() { }

  // MARK: Initial data load

  getUsername() {
    this.storageService.getUsername().then(name => {
      this.username = name;
      this.getGameData(name);
    });
  }

  getGameData(username: string) {
    this.storageService.getTresEnRayaData(username).then(jsonData => {

      if (jsonData !== null) {
        var data = JSON.parse(jsonData);
        this.mode = data.mode;
        this.title = data.title;
        this.dimension = data.dimension;
        this.turn = data.turn;
        this.gameFinished = data.gameFinished;
        this.matrix = data.matrix;
        this.victoryCells = data.victoryCells;
      } else {
        this.generateData();
      }
    });
  }

  //MARK: Initial data generation

  generateData() {
    this.mode = EASY_MODE;
    this.title = "Iniciar partida";
    this.dimension = 0;
    this.turn = X;
    this.gameFinished = false;
    this.matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
    this.victoryCells = Array(this.dimension).fill(EMPTY_CELL);
  }

  // MARK: Auxiliar functions

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isThereEmptyCell(matrix: string[][]) {
    return (matrix.map(row => { return row.includes(EMPTY_CELL) })).includes(true);
  }

  writeInMatrix(row: number, column: number, value: string) {
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

  getEmptyCells(matrix: string[][]) {
    var emptyCells = matrix.map((row, i) => {
      return row.map((element, j) => {
        if (element === EMPTY_CELL) {
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
    return emptyIds;
  }

  getRandomEmptyCell() {
    var emptyIds = this.getEmptyCells(this.matrix);
    var number = this.getRandomNumber(0, emptyIds.length - 1);
    return emptyIds[number];
  }

  // MARK: Board functions

  checkGame(row: number, column: number) {
    this.gameFinished = this.checkCells(this.matrix, this.turn, row, column);
    if (this.gameFinished == false) {
      this.turn = this.turn === X ? O : X;
      this.title = "Turno de " + this.turn;
    }
    this.saveGameData();
  }

  checkCells(matrix: string[][], value: string, x: number, y: number) {
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

  setVictoryCells(init: number, sum: number) {
    var value = this.matrix[Math.floor(init / this.dimension)][Math.floor(init % this.dimension)]
    this.title = "Victoria de " + value;
    for (var i = 0; i < this.dimension; i++) {
      this.victoryCells[i] = init + (i * sum);
    }
    if (value === X) {
      this.saveRanking(VICTORY);
    } else {
      this.saveRanking(DEFEAT);
    }
  }

  checkBoard(matrix: string[][], value: string) {
    var n = this.dimension;
    var col = 0;
    var row = 0;
    var diag = 0;
    var rdiag = 0;

    var cols = [];
    var rows = [];

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (matrix[i][j] === value) row++;
        if (matrix[j][i] === value) col++;
      }
      if (matrix[i][i] === value) diag++;
      if (matrix[i][n - (i + 1)] === value) rdiag++;
      cols.push(col === n);
      rows.push(row === n);
      col = 0;
      row = 0;
    }

    return rows.includes(true) || cols.includes(true) || diag === n || rdiag === n;
  }

  // MARK: Main functions

  playerTurn(id: string[]) {
    const row = parseInt(id[0]);
    const column = parseInt(id[1]);
    if (!this.gameFinished && typeof row !== "undefined" && typeof column !== "undefined" && this.matrix[row][column] == EMPTY_CELL) {
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
    this.matrix = Array(this.dimension).fill(Array(this.dimension).fill(EMPTY_CELL));
    this.victoryCells = Array(this.dimension).fill(EMPTY_CELL);
    this.saveGameData();
  }

  setDimensionTo3() {
    this.dimension = 3;
    this.resetBoard();
  }

  setDimensionTo4() {
    this.dimension = 4;
    this.resetBoard();
  }

  setGameMode(mode: string) {
    this.mode = mode;
    this.resetBoard();
  }

  changeUsername(username) {
    this.username = username;
    if (username !== "") {
      this.storageService.setUsername(username);
    }
    this.getGameData(username);
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
    if (this.mode == EASY_MODE) {
      var choice = this.tryToWin(X);
      if (choice != -1) {
        return choice;
      } else {
        return this.getRandomEmptyCell();
      }
    } else {
      return this.minimax(this.matrix, true, (res: any) => { }, 0);
    }
  }

  tryToWin(value: string) {
    var id = -1;

    //Get available moves
    var emptyIds = this.getEmptyCells(this.matrix);

    //Iterate over available moves
    emptyIds.forEach(element => {

      var row = Math.floor(element / this.dimension);
      var column = Math.floor(element % this.dimension);

      var child = this.matrix.map((r, i) => {
        if (row == i) {
          return r.map((c, j) => {
            return column == j ? value : c;
          });
        } else {
          return r;
        }
      });

      var victory = this.checkBoard(child, value);
      if (victory) {
        id = element;
      }
    });

    return id;
  }

  minimax(board: string[][], maximizing: boolean, callback: { (res: any): void; }, depth: number) {

    var dimension = this.dimension;

    if (depth == 0) this.minimaxOptions.clear();
    var Xvictory = this.checkBoard(board, X);
    var Ovictory = this.checkBoard(board, O);
    if (Xvictory) {
      return -100 + depth;
    } else if (Ovictory) {
      return 100 - depth;
    } else if (depth === dimension + 1) {
      return 0;
    }

    if (maximizing) {
      var best = -100;

      //Get available moves
      var emptyIds = this.getEmptyCells(board);

      //Iterate over available moves
      emptyIds.forEach(element => {

        var row = Math.floor(element / dimension);
        var column = Math.floor(element % dimension);

        var child = board.map((r, i) => {
          if (row == i) {
            return r.map((c, j) => {
              return column == j ? O : c;
            });
          } else {
            return r;
          }
        });

        var node_value = this.minimax(child, false, callback, depth + 1);
        best = Math.max(best, node_value);

        if (depth === 0) {
          var moves = this.minimaxOptions.has(node_value) ? this.minimaxOptions.get(node_value).toString() + "," + element.toString() : element
          this.minimaxOptions.set(node_value, moves)
        }

      });

      var result: number;
      if (depth === 0) {

        if (this.minimaxOptions.has(-100)) {
          best = -100;
        } else if (this.minimaxOptions.has(100)) {
          best = 100;
        }

        var bestResult = this.minimaxOptions.get(best);
        if (typeof bestResult == "string") {

          var bestArray = bestResult.split(",").map(id => parseInt(id));
          if (bestArray.length === Math.pow(dimension, 2) - 1) {
            if (bestArray.includes(0)) {
              result = 0;
            } else if (bestArray.includes(dimension - 1)) {
              result = dimension - 1;
            } else if (bestArray.includes((dimension - 1) * dimension)) {
              result = (dimension - 1) * dimension;
            } else if (bestArray.includes(Math.pow(dimension, 2) - 1)) {
              result = Math.pow(dimension, 2) - 1;
            } else {
              var random = this.getRandomNumber(0, bestArray.length - 1);
              result = bestArray[random];
            }
          } else {
            var random = this.getRandomNumber(0, bestArray.length - 1);
            result = bestArray[random];
          }

        } else {
          result = bestResult;
        }

        callback(result);
        return result;
      }
      return best;
    }

    if (!maximizing) {
      var best = 100;

      //Get available moves
      var emptyIds = this.getEmptyCells(board);

      //Iterate over available moves
      emptyIds.forEach(element => {

        var row = Math.floor(element / dimension);
        var column = Math.floor(element % dimension);

        var child = board.map((r, i) => {
          if (row == i) {
            return r.map((c, j) => {
              return column == j ? X : c;
            });
          } else {
            return r;
          }
        });

        var node_value = this.minimax(child, true, callback, depth + 1);
        best = Math.min(best, node_value);

        if (depth === 0) {
          var moves = this.minimaxOptions.has(node_value) ? this.minimaxOptions.get(node_value).toString() + "," + element.toString() : element
          this.minimaxOptions.set(node_value, moves)
        }

      });
      return best;
    }
  }

  //MARK: Save data functions

  saveGameData() {
    var data = {
      'mode': this.mode,
      'title': this.title,
      'dimension': this.dimension,
      'turn': this.turn,
      "gameFinished": this.gameFinished,
      'matrix': this.matrix,
      'victoryCells': this.victoryCells
    };
    this.storageService.setTresEnRayaData(JSON.stringify(data), this.username);
  }

  saveRanking(result: number) {
    this.storageService.getRanking().then(rankingJSON => {
      var ranking = JSON.parse(rankingJSON);
      if (ranking === null) {
        ranking = [];
      }
      var tresEnRayaData = {
        'victories': result === VICTORY ? 1 : 0,
        'defeats': result === DEFEAT ? 1 : 0
      };
      var ahorcadoData = null;
      ranking = ranking.filter(r => {
        if (r.username === this.username) {
          tresEnRayaData.victories = r.tresEnRaya === null ? tresEnRayaData.victories : r.tresEnRaya.victories + tresEnRayaData.victories;
          tresEnRayaData.defeats = r.tresEnRaya === null ? tresEnRayaData.defeats : r.tresEnRaya.defeats + tresEnRayaData.defeats;
          ahorcadoData = r.ahorcado;
        }
        return r.username !== this.username;
      });
      var userData = {
        'username': this.username,
        'ahorcado': ahorcadoData,
        'tresEnRaya': tresEnRayaData
      };
      ranking.push(userData);
      this.storageService.setRanking(JSON.stringify(ranking));
    });
  }

}
