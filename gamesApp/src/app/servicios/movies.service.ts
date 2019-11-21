import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: Observable<any[]>;
  constructor(private httpClient: HttpClient) {
    this.movies = this.loadMovies();
  }

  loadMovies(): Observable<any[]> {
    return this.httpClient.get('/assets/movies.json').pipe(map((data: any) => data.movies));
  }

  getMovies() {
    return this.movies;
  }

  // getMovie() {
  //   var index = Math.floor(Math.random() * this.movies.length);
  //   return this.movies.pipe( map( data => data.find(d => d)));
  // }
}
