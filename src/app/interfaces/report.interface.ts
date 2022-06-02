export interface Report {
    id: number;
    reportDate: Date;
    reportText: string;
    employeeId: number;
    employeeFirstName: string;
    employeeLastName: string;
}

export interface ReportListItem {
    id: number;
    reportDate: Date;
    employeeId: number;
    employeeFirstName: string;
    employeeLastName: string;
  }

export interface NewReportRequest {
    reportText: string;
    managerId: number;
    employeeId: number;
}