import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GameService, Game } from './game.service';

import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture } from '@angular/core/testing';

const mockData = [
  {
    title: 'sonic'
  }
];
class DataStub {
  public fetchGames(): Observable<Game[]> {
    return Observable.create(observer => {
      observer.next(mockData);
      observer.complete();
    });
  }
}

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let dataStub: DataStub;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppComponent
      ],
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: GameService, useClass: DataStub }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      dataStub = fixture.debugElement.injector.get(GameService);
    });
  }));

  it('should load the games on init', fakeAsync(() => {
    const spy = spyOn(dataStub, 'fetchGames')
      .and.returnValue(
        Observable.create(observer => {
          observer.next(mockData);
          observer.complete();
        })
      );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.catalog).toEqual(['sonic']);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
