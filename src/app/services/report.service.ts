import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import { NewReportRequest } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  postReport(report: NewReportRequest) {
    let url = `${environment.baseApiUrl}/${ApiPaths.Employees}/${report.managerId}/${ApiPaths.Reports}`;
    return this.http.post<NewReportRequest>(url, report);
  }
}