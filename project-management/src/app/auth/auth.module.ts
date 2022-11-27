import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShareModule } from '../share/share.module';
import AuthRoutingModule from './auth-routing.module';
import { UserComponent } from './pages/user/user.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent, AuthFormComponent],
  imports: [CommonModule, ShareModule, AuthRoutingModule, TranslocoModule],
})
export class AuthModule {}
