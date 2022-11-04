import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShareModule } from '../share/share.module';
import AuthRoutingModule from './auth-routing.module';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent],
  imports: [CommonModule, ShareModule, AuthRoutingModule],
})
export class AuthModule {}
