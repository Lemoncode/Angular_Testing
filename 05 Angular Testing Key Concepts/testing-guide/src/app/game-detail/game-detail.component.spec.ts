import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameDetailComponent } from './game-detail.component';
import { EventListener } from '@angular/core/src/debug/debug_node';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDetailComponent]
    });

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement.query(By.css('h1'));
    element = debugElement.nativeElement;
  });

  it('should display title', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain(component.title);
  });

  it('should display a different title', () => {
    const newTitle = 'Other';
    component.title = newTitle;
    fixture.detectChanges();
    expect(element.textContent).toContain(newTitle);
  });
});
