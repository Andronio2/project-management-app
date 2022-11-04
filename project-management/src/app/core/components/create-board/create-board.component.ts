import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BoardsService } from '../../services/API/board.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  boardForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private boardService: BoardsService,
    private dialogRef: MatDialogRef<CreateBoardComponent>,
  ) {
    this.boardForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

  createBoard() {
    this.boardService.createBoard(this.boardForm.getRawValue()).subscribe();
    this.dialogRef.close();
  }

  cancelBoard() {
    this.dialogRef.close();
  }
}
