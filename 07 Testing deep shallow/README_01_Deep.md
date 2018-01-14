## In this example we are going to create a deep test for a component.

## Steps.

### 1. The component will have dependencies with another components and pipes, lets add this previously.

* add folder common

```
|-src
    |-app
        |-common
          +---collapsible.component.ts
          +---state.pipe.ts
```

```typescript collapsible.component.ts
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

```
```typescript state.pipe.ts
import { Pipe, PipeTransform  } from '@angular/core';
import { State } from '../models/task.model';

// {{ myData | myPipe: 'arg1':'arg2':'arg3'... }} // pending done inprogress
@Pipe({ name: 'state' })
export class StatePipe implements PipeTransform {
  transform(value: State, ...args: string[]) {
    switch (value) {
      case State.Pending: return args[0];
      case State.Done: return args[1];
      case State.InProgress: return args[2];
    }
  }
}

```
```html user-tasks.component.html
<div *ngFor="let task of filteredTasks">
  <app-collapsible>
    <div collapsible-head>
      <label>Task Description:</label>
      <span>{{task.description}}</span>
    </div>
    <div collapsible-body>
      <h4 *ngIf="task.isAssigned">{{task.assigned}}</h4>
      <span [class]="task.state | state: 'pending':'done':'inprogress'"></span>
    </div>
  </app-collapsible>
</div>

```

* Now we can add a new file for our deep test. `user-tasks.component.deep.spec.ts`

```typescript
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UserTasksComponent } from './user-tasks.component';
import { State, Priority } from '../models/task.model';
import { By } from '@angular/platform-browser';

describe('UserTasksComponent', () => {
  let fixture: ComponentFixture<UserTasksComponent>,
      component:  UserTasksComponent,
      element: HTMLElement,
      debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        UserTasksComponent
      ],
      providers: [],
      schemas: []
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

```
* Now if we run our tests, what will happen?
* What happen is this component has direct dependencies in other elements, so we have a crash.

```text
Failed: Template parse errors:
The pipe 'state' could not be found ("
    <div collapsible-body>
      <h4 *ngIf="task.isAssigned">{{task.assigned}}</h4>
      <span [ERROR ->][class]="task.state | state: 'pending':'done':'inprogress'"></span>
    </div>
  </app-collapsible>
"): ng:///DynamicTestModule/UserTasksComponent.html@8:12
'app-collapsible' is not a known element:
1. If 'app-collapsible' is an Angular component, then verify that it is part of this module.
2. If 'app-collapsible' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("<div *ngFor="let task of filteredTasks">
  [ERROR ->]<app-collapsible>
    <div collapsible-head>
      <label>Task Description:</label>
"): ng:///DynamicTestModule/UserTasksComponent.html@1:2
```

### 2. Let's add the dependencies that we need to make it work.

```diff
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { UserTasksComponent } from './user-tasks.component';
import { State, Priority } from '../models/task.model';
import { By } from '@angular/platform-browser';
+import { CollapsibleComponent } from '../common/collapsible.component';
+import { StatePipe } from '../common/state.pipe';

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
+        CollapsibleComponent,
+        StatePipe
      ],
      providers: [],
      schemas: []
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

```
* Now our test pass.
