import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import { NewTaskRequest } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  postTask(task: NewTaskRequest) {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}/${task.employeeId}/${ApiPaths.Tasks}`;
    return this.http.post<NewTaskRequest>(url, task);
  }
}
