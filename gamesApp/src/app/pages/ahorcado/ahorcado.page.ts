import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../servicios/movies.service';

const imagePath = "../../../assets/images/hangman/";

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.page.html',
  styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {

  title = "Iniciar partida";
  image = imagePath + "hangman1.png";
  attempts = 8;
  movies;
  movie;
  words;
  answer;

  letters = [
    { value: "a", disabled: false },
    { value: "b", disabled: false },
    { value: "c", disabled: false },
    { value: "d", disabled: false },
    { value: "e", disabled: false },
    { value: "f", disabled: false },
    { value: "g", disabled: false },
    { value: "h", disabled: false },
    { value: "i", disabled: false },
    { value: "j", disabled: false },
    { value: "k", disabled: false },
    { value: "l", disabled: false },
    { value: "m", disabled: false },
    { value: "n", disabled: false },
    { value: "ñ", disabled: false },
    { value: "o", disabled: false },
    { value: "p", disabled: false },
    { value: "q", disabled: false },
    { value: "r", disabled: false },
    { value: "s", disabled: false },
    { value: "t", disabled: false },
    { value: "u", disabled: false },
    { value: "v", disabled: false },
    { value: "w", disabled: false },
    { value: "x", disabled: false },
    { value: "y", disabled: false },
    { value: "z", disabled: false }
  ];
  numbers = [
    { value: "&", disabled: false },
    { value: "0", disabled: false },
    { value: "1", disabled: false },
    { value: "2", disabled: false },
    { value: "3", disabled: false },
    { value: "4", disabled: false },
    { value: "5", disabled: false },
    { value: "6", disabled: false },
    { value: "7", disabled: false },
    { value: "8", disabled: false },
    { value: "9", disabled: false }
  ];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovies().subscribe(
      (data: any[]) => {
        this.movies = data;
        this.getMovie();
      });
  }

  ngOnInit() { }

  getMovie() {
    this.movie = this.movies[Math.floor(Math.random() * this.movies.length)];
    this.words = this.movie.split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });
  }

  selectCharacter(character) {
    var success = this.checkAnswer(character);
    if (!success) {
      this.attempts--;
    }
    if (this.gameFinished()) {
      this.title = "Has ganado!";
      this.image = imagePath + "game_won.png";
      this.showAnswer();
    } else if (this.attempts > 0) {
      this.title = "Te quedan " + this.attempts + " intentos";
      this.image = this.setImage();
    } else {
      this.title = "Has perdido";
      this.image = imagePath + "game_lost.png";
      this.showAnswer();
    }
  }

  checkAnswer(character) {
    var success = false;
    this.answer = this.words.map((word, i) => {
      return word.split("").map((c, j) => {
        if (c === character || (character === "&amp;" && c === "&")) {
          success = true;
          return c
        } else {
          return this.answer[i][j];
        }
      });
    });
    return success
  }

  gameFinished() {
    var gameFinished = true;
    for (let word of this.answer) {
      for (let character of word) {
        if (character === '-') { gameFinished = false }
      }
    }
    return gameFinished;
  }

  setImage() {
    var imageId = 9 - this.attempts;
    return imagePath + "hangman" + imageId + ".png";

  }

  showAnswer() {
    this.attempts = 0;
    this.answer = this.words.map((word) => {
      return word.split("").map((c) => {
        return c;
      });
    });
  }

  resetBoard() {
    this.title = "Iniciar partida";
    this.image = imagePath + "hangman1.png";
    this.attempts = 8;
    this.getMovie();
    this.letters.map((letter => {
      letter.disabled = false;
    }));
    this.numbers.map((number => {
      number.disabled = false;
    }));
  }

}
