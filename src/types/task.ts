export type Priority = 'high' | 'medium' | 'low';
export type Status = 'todo' | 'ongoing' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}