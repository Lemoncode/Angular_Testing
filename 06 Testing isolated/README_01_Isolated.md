## In this example we are going to create an isolated test for a component.

## Steps.

### 1, First we are going to create user-tasks.component

* ng generate component user-task

### 2. Let's remove all the generated boilerplate on `user-tasks.component.spec.ts`

```diff
-import { async, ComponentFixture, TestBed } from '@angular/core/testing';
-
import { UserTasksComponent } from './user-tasks.component';

describe('UserTasksComponent', () => {
-  let component: UserTasksComponent;
-  let fixture: ComponentFixture<UserTasksComponent>;
-
-  beforeEach(async(() => {
-    TestBed.configureTestingModule({
-      declarations: [ UserTasksComponent ]
-    })
-    .compileComponents();
-  }));
-
-  beforeEach(() => {
-    fixture = TestBed.createComponent(UserTasksComponent);
-    component = fixture.componentInstance;
-    fixture.detectChanges();
-  });
-
-  it('should create', () => {
-    expect(component).toBeTruthy();
-  });
});

```
### 3. Now we are going to create our Task model.

```typescript src/app/models/task.model.ts
export enum State { Pending, InProgress, Done }
export enum Priority { Low, Medium, High }

export interface ITask {
  description: string;
  assigned: string;
  isAssigned?: boolean;
  state: State;
  priority: Priority;
}
```
### 4. Now we are going to create our expects for this component, and from there start creating the comnponent.

```diff
import { UserTasksComponent } from './user-tasks.component';

describe('UserTasksComponent', () => {
+  describe('when filterBy changes', () => {
+    describe('should filter tasks by Pending', () => {
+
+    });
+
+    describe('should filter tasks by InProgress', () => {
+
+    });
+
+    describe('should filter mtasks by Done', () => {
+
+    });
+  });
+
+  describe('when sortBy changes', () => {
+    it('should order by Low', () => {
+
+    });
+
+    it('should order by Medium', () => {
+
+    });
+
+    it('should order by High', () => {
+
+    });
+  });
});

```
### 5. Now we can write the infraestructure for our tests.

```diff
import { UserTasksComponent } from './user-tasks.component';
import { ITask, Priority, State } from '../models/task.model';

describe('UserTasksComponent', () => {
+  let component: UserTasksComponent;
+  const tasks: ITask[] = [
+    {
+      description: 'Foo A',
+      assigned: 'jai',
+      isAssigned: true,
+      state: State.InProgress,
+      priority: Priority.Low,
+    },
+    {
+      description: 'Foo B',
+      isAssigned: false,
+      state: State.Pending,
+      priority: Priority.Low,
+    },
+    {
+      description: 'Foo C',
+      assigned: 'fer',
+      isAssigned: true,
+      state: State.Done,
+      priority: Priority.High,
+    },
+  ];
+
+  beforeEach(() => {
+    component = new UserTasksComponent();
+  });
+
  describe('when filterBy changes', () => {
    it('should filter tasks by Pending', () => {

    });

    it('should filter tasks by InProgress', () => {

    });

    it('should filter mtasks by Done', () => {

    });
  });

  describe('when sortBy changes', () => {
    it('should order by Low', () => {

    });

    it('should order by Medium', () => {

    });

    it('should order by High', () => {

    });
  });
});

```
* Notice that at last a component is just a TS class. 

### 6. Now we are going to modify our component to statisfy the previous requisites that we have observed in our expecs. 

* We are going to need a variable that holds the `State`
* We are going to need a variable that holds all the `tasks`
* We are going to need a variable that holds the filtered `tasks`
* We are going to need a variable that holds the `Priority`
* Our component has to listen to any change on its input properties so we are going to implement `OnChanges`

```diff src/app/user-tasks/user-tasks.component.ts
-import { Component, OnInit } from '@angular/core';
+import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
-export class UserTasksComponent implements OnInit {
+export class UserTasksComponent {    
+  tasks: ITask[];
+  filteredTasks: ITask[];
+  filterBy: State;
+  orderBy: Priority;
-  ngOnInit() {
-  }
+  
  constructor() { }
+
+  ngOnChanges(changes: SimpleChanges): void {
+    throw new Error("Method not implemented.");
+  }
}

```
### 7. Ok, with this on place let's write our filtering tests.

```diff
import { UserTasksComponent } from './user-tasks.component';
import { ITask, Priority, State } from '../models/task.model';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  const tasks: ITask[] = [
    {
      description: 'Foo A',
      assigned: 'jai',
      isAssigned: true,
      state: State.InProgress,
      priority: Priority.Low,
    },
    {
      description: 'Foo B',
      isAssigned: false,
      state: State.Pending,
      priority: Priority.Low,
    },
    {
      description: 'Foo C',
      assigned: 'fer',
      isAssigned: true,
      state: State.Done,
      priority: Priority.High,
    },
  ];

  beforeEach(() => {
    component = new UserTasksComponent();
  });

  describe('when filterBy changes', () => {
    it('should filter tasks by Pending', () => {
+     // Arrange
+      component.filterBy = State.Pending;
+      const changes: SimpleChanges = {
+        ['filterBy']: {
+          previousValue: null,
+          currentValue: State.Pending,
+          firstChange: true,
+          isFirstChange: () => true,
+        }
+      };
+
+      // Act
+      component.ngOnChanges(changes);
+
+      // Assert
+      expect(component.filteredTasks[0].description).toBe('Foo A');
+    });
+
    it('should filter tasks by InProgress', () => {
+      // Arrange
+      component.filterBy = State.Pending;
+      const changes: SimpleChanges = {
+        ['filterBy']: {
+          previousValue: null,
+          currentValue: State.InProgress,
+          firstChange: true,
+          isFirstChange: () => true,
+        }
+      };
+
+      // Act
+      component.ngOnChanges(changes);
+
+      // Assert
+      expect(component.filteredTasks[0].description).toBe('Foo B');
    });

    it('should filter mtasks by Done', () => {
+      // Arrange
+      component.filterBy = State.Pending;
+      const changes: SimpleChanges = {
+        ['filterBy']: {
+          previousValue: null,
+          currentValue: State.Done,
+          firstChange: true,
+          isFirstChange: () => true,
+        }
+      };
+
+      // Act
+      component.ngOnChanges(changes);
+
+      // Assert
+      expect(component.filteredTasks[0].description).toBe('Foo C');
    });
  });

  describe('when sortBy changes', () => {
    it('should order by Low', () => {

    });

    it('should order by Medium', () => {

    });

    it('should order by High', () => {

    });
  });
});

```
* If we run the tests now we expect that the filter related ones fail.

### 8. Let's write code to solve this issue.

```typescript user-tasks.component.ts
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ITask, Priority, State } from '../models/task.model';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnChanges {
  @Input() tasks: ITask[];
  @Input() filterBy: State;
  @Input() orderBy: Priority;
  filteredTasks: ITask[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
   const key = Object.keys(changes)[0];
   this.filteredTasks =  this.changeHandler(key, changes[key].currentValue);
  }

  private changeHandler = (key: string, value: State): ITask[] => {
    const actions = {
      'filterBy': (state: State) => this.filterTasks(state)
    };
    return actions[key](value);
  }

  private filterTasks = (filterBy: State): ITask[] => (
    this.tasks.filter((t) => t.state === filterBy)
  );
}

```
* Now all our tests pass.

### 9. We are going to write the tests related with the sort operations.

```diff
import { UserTasksComponent } from './user-tasks.component';
import { ITask, Priority, State } from '../models/task.model';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  const tasks: ITask[] = [
    {
      description: 'Foo A',
      assigned: 'jai',
      isAssigned: true,
      state: State.InProgress,
      priority: Priority.Low,
    },
    {
      description: 'Foo B',
      isAssigned: false,
      state: State.Pending,
      priority: Priority.Low,
    },
    {
      description: 'Foo C',
      assigned: 'fer',
      isAssigned: true,
      state: State.Done,
      priority: Priority.High,
    },
  ];

  beforeEach(() => {
    component = new UserTasksComponent();
    component.tasks = tasks;
  });

  describe('when filterBy changes', () => {
    it('should filter tasks by Pending', () => {
      // Arrange
      component.filterBy = State.Pending;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.Pending,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo B');
    });

    it('should filter tasks by InProgress', () => {
      // Arrange
      component = new UserTasksComponent();
      component.tasks = tasks;
      component.filterBy = State.InProgress;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.InProgress,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo A');
    });

    it('should filter mtasks by Done', () => {
      // Arrange
      component = new UserTasksComponent();
      component.tasks = tasks;
      component.filterBy = State.Done;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.Done,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo C');
    });
  });

  describe('when sortBy changes', () => {
    it('should order by Low', () => {
+      // Arrange
+      component.sortBy = Priority.Low;
+      const changes: SimpleChanges = {
+        ['sortBy']: {
+          previousValue: null,
+          currentValue: Priority.Low,
+          firstChange: true,
+          isFirstChange: () => true,
+        }
+      };
+
+      // Act
+      component.ngOnChanges(changes);
+
+      // Assert
+      expect(component.filteredTasks[0].description).toBe('Foo A');
    });

    it('should order by Medium', () => {

    });

    it('should order by High', () => {

    });
  });
});

```
* With this the tests are already broken.

```diff user-tasks.component.ts
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ITask, Priority, State } from '../models/task.model';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnChanges {
  @Input() tasks: ITask[];
  @Input() filterBy: State;
  @Input() sortBy: Priority;
  filteredTasks: ITask[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
   const key = Object.keys(changes)[0];
   this.filteredTasks =  this.changeHandler(key, changes[key].currentValue);
  }

-  private changeHandler = (key: string, value: State): ITask[] => {
+  private changeHandler = (key: string, value: State | Priority): ITask[] => {
    const actions = {
      'filterBy': (state: State) => this.filterTasks(state),
+      'sortBy': (priority: Priority) => this.sortTasks(priority)
    };
    return actions[key](value);
  }

  private filterTasks = (filterBy: State): ITask[] => (
    this.tasks.filter((t) => t.state === filterBy)
  );

+  private sortTasks = (sortBy: Priority): ITask[] => {
+    const tasksSelectedPriority = this.filteredTasks.filter((t) => t.priority === sortBy);
+    const tasksNotSelectedPriority = this.filteredTasks.filter((t) => t.priority !== sortBy);
+    return tasksSelectedPriority.concat(tasksNotSelectedPriority);
+  }
}

```
* And add minor changes to our specs.

```diff user-tasks.component.spec.ts
import { UserTasksComponent } from './user-tasks.component';
import { ITask, Priority, State } from '../models/task.model';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  const tasks: ITask[] = [
    {
      description: 'Foo A',
      assigned: 'jai',
      isAssigned: true,
      state: State.InProgress,
      priority: Priority.Low,
    },
    {
      description: 'Foo B',
      isAssigned: false,
      state: State.Pending,
      priority: Priority.Low,
    },
    {
      description: 'Foo C',
      assigned: 'fer',
      isAssigned: true,
      state: State.Done,
      priority: Priority.High,
    },
  ];

  beforeEach(() => {
    component = new UserTasksComponent();
    component.tasks = tasks;
+   component.filteredTasks = tasks;
  });

  describe('when filterBy changes', () => {
    it('should filter tasks by Pending', () => {
      // Arrange
      component.filterBy = State.Pending;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.Pending,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo B');
    });

    it('should filter tasks by InProgress', () => {
      // Arrange
      component = new UserTasksComponent();
      component.tasks = tasks;
      component.filterBy = State.InProgress;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.InProgress,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo A');
    });

    it('should filter mtasks by Done', () => {
      // Arrange
      component = new UserTasksComponent();
      component.tasks = tasks;
      component.filterBy = State.Done;
      const changes: SimpleChanges = {
        ['filterBy']: {
          previousValue: null,
          currentValue: State.Done,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo C');
    });
  });

  describe('when sortBy changes', () => {
    it('should order by Low', () => {
      // Arrange
      component.sortBy = Priority.Low;
      const changes: SimpleChanges = {
        ['sortBy']: {
          previousValue: null,
          currentValue: Priority.Low,
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      // Act
      component.ngOnChanges(changes);

      // Assert
      expect(component.filteredTasks[0].description).toBe('Foo A');
    });

    it('should order by Medium', () => {

    });

    it('should order by High', () => {

    });
  });
});

```
