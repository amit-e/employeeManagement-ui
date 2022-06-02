import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Employee,
  EmployeeListItem
} from 'src/app/interfaces/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeType } from 'src/app/shared/global-enums';
import { positionDictionary } from 'src/app/shared/positions';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  subordinates!: EmployeeListItem[];
  positions: any[] = positionDictionary;
  displayedColumns: string[] = ['name', 'position', 'action'];
  employeeTypes = EmployeeType;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let idParam = params?.get('id');
      let id: number = idParam ? +idParam : 0;
      this.employeeService.getEmployee(id).subscribe({
        next: (res) => {
          this.employee = res;
          if (this.employee.typeId == EmployeeType.Manager) {
            this.employeeService
              .getSubordinates(id)
              .subscribe((subordinates) => (this.subordinates = subordinates));
          }
        },
        error: () => this.router.navigate(['/404']),
      });
    });
  }

  openReportDialog() {
    this.dialog.open(ReportDialogComponent, {
      width: '30%',
      data: this.employee,
    });
  }

  openTaskDialog(employee: EmployeeListItem) {
    this.dialog.open(TaskDialogComponent, {
      data: employee,
    });
  }
}
