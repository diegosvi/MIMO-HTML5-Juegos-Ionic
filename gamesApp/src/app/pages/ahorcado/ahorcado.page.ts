import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../servicios/movies.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.page.html',
  styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {

  movie;
  words;
  answer;

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovies().subscribe(
      (data: any[]) => {
        this.movie = data[Math.floor(Math.random() * data.length)];
        this.words = this.movie.split(" ");
        this.answer = this.words.map((word) => {
          return word.split("").map(() => {
            return "-";
          });
        });
      });
  }

  ngOnInit() {
  }

}
