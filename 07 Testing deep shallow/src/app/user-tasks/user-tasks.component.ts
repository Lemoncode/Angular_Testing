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

  private changeHandler = (key: string, value: State | Priority): ITask[] => {
    const actions = {
      'filterBy': (state: State) => this.filterTasks(state),
      'sortBy': (priority: Priority) => this.sortTasks(priority)
    };
    return actions[key](value);
  }

  private filterTasks = (filterBy: State): ITask[] => (
    this.tasks.filter((t) => t.state === filterBy)
  );

  private sortTasks = (sortBy: Priority): ITask[] => {
    const tasksSelectedPriority = this.filteredTasks.filter((t) => t.priority === sortBy);
    const tasksNotSelectedPriority = this.filteredTasks.filter((t) => t.priority !== sortBy);
    return tasksSelectedPriority.concat(tasksNotSelectedPriority);
  }
}
