import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserTasksComponent } from './user-tasks.component';
import { State, Priority } from '../models/task.model';
import { By } from '@angular/platform-browser';
import { CollapsibleComponent } from '../common/collapsible.component';
import { StatePipe } from '../common/state.pipe';

describe('UserTasksComponent', () => {
  let fixture: ComponentFixture<UserTasksComponent>,
      component:  UserTasksComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        UserTasksComponent,
        // CollapsibleComponent,
        StatePipe
      ],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(UserTasksComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      debugEl = fixture.debugElement;
    });
  }));

  describe('initial display', () => {
    it('should have the right task description', () => {
      component.filteredTasks = [
        {
          description: 'Foo task',
          state: State.Done,
          isAssigned: false,
          priority: Priority.Low
        }
      ];

      fixture.detectChanges();

      expect(element.querySelector('[collapsible-head]').textContent)
        .toContain('Foo task');

      expect(debugEl.query(By.css('[collapsible-head]')).nativeElement.textContent)
      .toContain('Foo task');
    });
  });
});
