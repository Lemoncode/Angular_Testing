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
    component.filteredTasks = tasks;
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
