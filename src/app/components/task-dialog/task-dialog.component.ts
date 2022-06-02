import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public employee: any,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskText: new FormControl(),
      dueDate: new FormControl(),
      employeeId: new FormControl(),
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      this.taskForm.patchValue({ employeeId: this.employee.id });

      this.taskService.postTask(this.taskForm.value).subscribe({
        next: () => {
          alert('New task saved succesfully');
          this.dialogRef.close('save');
        },
        error: () => alert('Error saving new task!'),
      });
    }
  }
}