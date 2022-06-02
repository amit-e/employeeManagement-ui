import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddDialogComponent } from '../employee-add-dialog/employee-add-dialog.component';
import { Router } from '@angular/router';
import { EmployeeListItem } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<EmployeeListItem>;
  
  displayedColumns: string[] = ['name', 'position', 'action'];
  pageSize: number = 10;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<EmployeeListItem>(result);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error getting employees');
      },
    });
  }

  viewEmployee(employee: any) {
    this.router.navigate(['/employees', employee.id]);
  }

  openAddEmployeeDialog() {
    this.dialog.open(EmployeeAddDialogComponent, {})
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllEmployees();
        }
      });
  }
}
