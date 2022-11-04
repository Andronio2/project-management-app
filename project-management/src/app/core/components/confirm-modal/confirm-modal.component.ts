import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmData } from './confirm.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmData,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {}

  getAnswer(answer: boolean) {
    this.dialogRef.close(answer);
  }
}
