import { Component } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  template: `
    <div (click)="toggleContent()" class="pointable">
      <h4>
          <ng-content select="[collapsible-head]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[collapsible-body]"></ng-content>
    </div>
  `,
  styles: [`
    .pointable { cursor: pointer; }
  `]
})
export class CollapsibleComponent {
  visible = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
