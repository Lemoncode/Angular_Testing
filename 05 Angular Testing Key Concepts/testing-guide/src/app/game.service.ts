import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Game {
  title: string;
}

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  fetchGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/games');
  }
}
