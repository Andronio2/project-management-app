import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShareModule } from '../share/share.module';
import AuthRoutingModule from './auth-routing.module';
import { UserComponent } from './pages/user/user.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent, ConfirmModalComponent],
  imports: [CommonModule, ShareModule, AuthRoutingModule],
})
export class AuthModule {}
