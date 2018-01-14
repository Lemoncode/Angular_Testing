import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  catalog: string[];
  constructor(private gameService: GameService) {}
  ngOnInit(): void {
    this.gameService.fetchGames()
      .subscribe((r) => {
        this.catalog = r.map(s => s.title);
      });
  }
}
