import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { ICreateUserDto, ISigninUserDto } from 'src/app/share/models/auth.model';
import passwordValidator from '../../validators/passwordValidator';
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() formType: string = '';

  @Input() title: string = '';

  @Output() getFormData = new EventEmitter<ICreateUserDto | ISigninUserDto>();

  authForm: FormGroup | null = null;

  name: FormControl | null = null;

  login = new FormControl('', [Validators.required, Validators.minLength(3)]);

  password = new FormControl('', [Validators.required, passwordValidator]);

  isLoading$ = this.progressBarService.isLoading$;

  constructor(private fb: FormBuilder, private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.name = !(this.formType === 'signin')
      ? new FormControl('', [Validators.required, Validators.minLength(3)])
      : null;
    this.authForm = this.fb.group({
      ...(this.name && { name: this.name }),
      login: this.login,
      password: this.password,
    });
    this.isLoading$.subscribe({
      next: (res) => {
        if (res) {
          this.authForm?.disable();
        } else {
          this.authForm?.enable();
        }
      },
    });
  }

  onSubmit() {
    this.getFormData.emit(this.authForm?.getRawValue());
  }
}
