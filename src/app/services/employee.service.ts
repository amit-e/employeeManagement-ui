import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import { Employee, EmployeeListItem, NewEmployeeRequest } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployee(id: number) {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}/${id}`;
    return this.http.get<Employee>(url);
  }

  getEmployeeList() {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}`;
    return this.http.get<EmployeeListItem[]>(url);
  }

  postEmployee(employee: NewEmployeeRequest) {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}`;
    return this.http.post<NewEmployeeRequest>(url, employee);
  }

  getSubordinates(managerId: number) {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}/${managerId}/subordinates`;
    return this.http.get<EmployeeListItem[]>(url);
  }

  getManagersList() {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}/managers`;
    return this.http.get<EmployeeListItem[]>(url);
  }
}
