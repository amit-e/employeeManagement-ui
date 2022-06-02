export interface Task {
    id: number;
    employeeId: number;
    taskText: string;
    assignDate: Date;
    dueDate: Date;
}

export interface TaskListItem {
    id: number;
    employeeId: number;
    taskText: string;
    assignDate: Date;
    dueDate: Date;
}

export interface NewTaskRequest {
    employeeId: number;
    taskText: string;
    dueDate: Date;
}