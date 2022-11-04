import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: boolean,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {}

  getAnswer(answer: boolean) {
    this.dialogRef.close(answer);
  }
}
