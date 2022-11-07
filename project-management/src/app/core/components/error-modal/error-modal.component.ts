import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IErrorModal } from '../../models/modal.model';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IErrorModal,
    private dialogRef: MatDialogRef<ErrorModalComponent>,
  ) {}

  getAnswer(answer: boolean) {
    this.dialogRef.close(answer);
  }
}
