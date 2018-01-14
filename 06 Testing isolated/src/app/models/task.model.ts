export enum State { Pending, InProgress, Done }
export enum Priority { Low, Medium, High }

export interface ITask {
  description: string;
  assigned?: string;
  isAssigned: boolean;
  state: State;
  priority: Priority;
}
