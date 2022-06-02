import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeListItem } from 'src/app/interfaces/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { positionDictionary } from 'src/app/shared/positions';

@Component({
  selector: 'app-employee-add-dialog',
  templateUrl: './employee-add-dialog.component.html',
  styleUrls: ['./employee-add-dialog.component.css'],
})
export class EmployeeAddDialogComponent implements OnInit {
  employeeForm!: FormGroup;
  positions: any[] = positionDictionary;
  managers: /*EmployeeListItem[]*/ any[] = [ //temp.. should populate from employeeService.getManagersList()
    { id: '1', firstName: 'a', lastName: 'a' },
    { id: '2', firstName: 'b', lastName: 'b' },
    { id: '3', firstName: 'c', lastName: 'c' },
  ]; 

  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeAddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      typeId: new FormControl(),
      positionId: new FormControl(),
      managerId: new FormControl(),
    });
  }

  addEmployee(): void {
    if (this.employeeForm.valid) {
      let typeId = +this.employeeForm.get('typeId')?.value;
      this.employeeForm.patchValue({ typeId });

      this.employeeService.postEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          alert('New employee added succesfully');
          this.dialogRef.close('save');
        },
        error: () => alert('Error saving new employee'),
      });
    }
  }
}