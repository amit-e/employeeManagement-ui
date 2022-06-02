import { TaskListItem } from "./task.interface";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    positionId: number;
    typeId: number;
    managerId: number;
    managerFirstName: string;
    managerLastName: string;
    tasks: TaskListItem[];
}

export interface EmployeeListItem {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    managerId: number;
}

export interface NewEmployeeRequest {
    firstName: string;
    lastName: string;
    positionId: number;
    typeId: number;
    managerId: number;
}