import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent {
  columnForm: FormGroup;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateColumnComponent>) {
    this.columnForm = this.fb.group({
      title: this.title,
    });
  }

  createColumn() {
    this.dialogRef.close();
  }

  cancelColumn() {
    this.dialogRef.close();
  }
}
