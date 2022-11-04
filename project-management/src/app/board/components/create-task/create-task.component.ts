import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  description = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255),
  ]);

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateTaskComponent>) {
    this.taskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

  createTask() {
    this.dialogRef.close();
  }

  cancelTask() {
    this.dialogRef.close();
  }
}
