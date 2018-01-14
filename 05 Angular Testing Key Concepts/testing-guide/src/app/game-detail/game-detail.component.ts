import { Component } from '@angular/core';

@Component({
  selector: 'app-game-detail',
  template: `
    <h1>{{title}}</h1>
    <h2>{{release}}</h2>
  `
})
export class GameDetailComponent {
  title = 'Title';
  release = Date.now().toLocaleString();
}
