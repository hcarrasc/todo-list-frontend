export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
}
