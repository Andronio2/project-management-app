import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';
import noSpaceValidator from '../../validators/noSpaceValidator';
import passwordValidator from '../../validators/passwordValidator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  @Input() formType: string = '';

  @Input() title: string = '';

  @Output() getFormData = new EventEmitter<ICreateUserDto | ISigninUserDto>();

  authForm: FormGroup | null = null;

  name: FormControl | null = null;

  login = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    noSpaceValidator,
    Validators.maxLength(20),
  ]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  isLoading$ = this.progressBarService.isLoading$;

  destroy$ = new Subject();

  constructor(private fb: FormBuilder, private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.name = !(this.formType === 'signin')
      ? new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ])
      : null;
    this.authForm = this.fb.group({
      ...(this.name && { name: this.name }),
      login: this.login,
      password: this.password,
    });
    this.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res) {
        this.authForm?.disable();
      } else {
        this.authForm?.enable();
      }
    });

    [this.name, this.login].forEach((control) => {
      control?.valueChanges
        .pipe(takeUntil(this.destroy$), debounceTime(300))
        .subscribe((change) => {
          if (change === null) {
            return;
          }
          const trimmed = change.trim();
          if (!trimmed.length) {
            control.setValue('');
          } else {
            control.setValue(change.trimStart());
          }
        });
    });
  }

  onSubmit() {
    this.getFormData.emit(this.authForm?.getRawValue());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
