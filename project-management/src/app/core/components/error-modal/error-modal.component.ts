import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { IErrorModal } from '../../models/modal.model';
import { AuthService } from '../../services/API/auth.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  errorMessage = `${this.translocoService.translate(`error.code.${this.data.status}`)}`;

  constructor(
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: IErrorModal,
    private dialogRef: MatDialogRef<ErrorModalComponent>,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    if (this.data.status === 401) {
      this.dialogRef.beforeClosed().subscribe(() => {
        this.authService.logOut();
      });
    }
  }

  getAnswer(answer: boolean) {
    this.dialogRef.close(answer);
  }
}
