import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee.interface';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css'],
})
export class ReportDialogComponent implements OnInit {
  reportForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public employee: any,
    private reportService: ReportService,
    private dialogRef: MatDialogRef<ReportDialogComponent>
  ) {}

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      reportText: new FormControl(),
      employeeId: new FormControl(),
      managerId: new FormControl(),
    });
  }

  saveReport() {
    if (this.reportForm.valid) {
      this.reportForm.patchValue({ employeeId: this.employee.id });
      this.reportForm.patchValue({ managerId: this.employee.managerId });

      this.reportService.postReport(this.reportForm.value).subscribe({
        next: () => {
          alert('New report saved succesfully');
          this.dialogRef.close('save');
        },
        error: () => alert('Error saving new report!'),
      });
    }
  }
}