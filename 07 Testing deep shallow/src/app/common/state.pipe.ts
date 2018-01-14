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
